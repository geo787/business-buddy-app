
import { Intent } from "@/models/Intent";

// Calculate cosine similarity between two vectors
const cosineSimilarity = (vec1: number[], vec2: number[]): number => {
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    mag1 += vec1[i] * vec1[i];
    mag2 += vec2[i] * vec2[i];
  }
  
  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);
  
  if (mag1 === 0 || mag2 === 0) return 0;
  
  return dotProduct / (mag1 * mag2);
};

// Tokenize text into simple bag of words with improved handling of Romanian diacritics
const tokenize = (text: string): string[] => {
  return text.toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(token => token.length > 0);
};

// Calculate TF (Term Frequency) for a document
const calculateTF = (tokens: string[]): Record<string, number> => {
  const tf: Record<string, number> = {};
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1;
  });
  
  // Normalize by document length
  Object.keys(tf).forEach(token => {
    tf[token] = tf[token] / tokens.length;
  });
  
  return tf;
};

// Calculate IDF (Inverse Document Frequency) for improved matching
const calculateIDF = (documents: string[][], term: string): number => {
  let docsWithTerm = 0;
  
  for (const doc of documents) {
    if (doc.includes(term)) {
      docsWithTerm++;
    }
  }
  
  // Add smoothing to avoid division by zero
  return Math.log((documents.length + 1) / (docsWithTerm + 1)) + 1;
};

// Get vector representation of text for similarity comparison with TF-IDF weighting
export const vectorize = (text: string, vocabulary: string[], idfs: Record<string, number>): number[] => {
  const tokens = tokenize(text);
  const tf = calculateTF(tokens);
  
  return vocabulary.map(term => (tf[term] || 0) * (idfs[term] || 1));
};

// Build vocabulary from training phrases
export const buildVocabulary = (intents: Intent[]): {
  vocabulary: string[],
  idfs: Record<string, number>
} => {
  const allTokens = new Set<string>();
  const documents: string[][] = [];
  
  // Collect all documents and tokens
  intents.forEach(intent => {
    intent.trainingPhrases.forEach(phrase => {
      const tokens = tokenize(phrase);
      documents.push(tokens);
      tokens.forEach(token => {
        allTokens.add(token);
      });
    });
  });
  
  // Calculate IDF for each term in vocabulary
  const vocabulary = Array.from(allTokens);
  const idfs: Record<string, number> = {};
  
  vocabulary.forEach(term => {
    idfs[term] = calculateIDF(documents, term);
  });
  
  return { vocabulary, idfs };
};

// Enhanced intent matching with context awareness
export const findBestMatchingIntent = (
  userMessage: string, 
  intents: Intent[], 
  conversationHistory: string[] = []
): Intent | null => {
  if (intents.length === 0) return null;
  
  // Create vocabulary from all training phrases
  const { vocabulary, idfs } = buildVocabulary(intents);
  
  // Vectorize user message
  const userVector = vectorize(userMessage, vocabulary, idfs);
  
  let bestMatch: Intent | null = null;
  let highestSimilarity = 0.25; // Adjusted threshold to consider a match
  
  // Consider conversation context by giving more weight to recent topics
  const contextBoost: Record<string, number> = {};
  if (conversationHistory.length > 0) {
    const historyText = conversationHistory.join(" ");
    const historyTokens = tokenize(historyText);
    const uniqueTokens = new Set(historyTokens);
    
    uniqueTokens.forEach(token => {
      contextBoost[token] = 0.15; // Boost for contextual tokens
    });
  }
  
  intents.forEach(intent => {
    intent.trainingPhrases.forEach(phrase => {
      const phraseVector = vectorize(phrase, vocabulary, idfs);
      let similarity = cosineSimilarity(userVector, phraseVector);
      
      // Apply context boosting
      const phraseTokens = tokenize(phrase);
      let contextScore = 0;
      phraseTokens.forEach(token => {
        if (contextBoost[token]) {
          contextScore += contextBoost[token];
        }
      });
      
      similarity += contextScore;
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = intent;
      }
    });
  });
  
  return bestMatch;
};

// Extract entities from user message (enhanced implementation)
export const extractEntities = (userMessage: string): Record<string, string> => {
  const entities: Record<string, string> = {};
  
  // Extract order numbers (supports multiple formats)
  const orderMatch = userMessage.match(/#(\d+)/);
  if (orderMatch) {
    entities.orderNumber = orderMatch[1];
  } else {
    // Try alternative format like "comanda 12345"
    const altOrderMatch = userMessage.match(/comanda\s+(\d+)/i);
    if (altOrderMatch) {
      entities.orderNumber = altOrderMatch[1];
    }
  }
  
  // Extract dates with enhanced Romanian date format support
  const dateMatch = userMessage.match(/(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{2,4})/);
  if (dateMatch) {
    entities.date = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
  } else {
    // Match Romanian date formats like "15 ianuarie 2023"
    const romanianMonths = {
      "ianuarie": "01", "februarie": "02", "martie": "03", "aprilie": "04", 
      "mai": "05", "iunie": "06", "iulie": "07", "august": "08", 
      "septembrie": "09", "octombrie": "10", "noiembrie": "11", "decembrie": "12"
    };
    
    const romanianDateMatch = userMessage.match(/(\d{1,2})\s+(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)\s+(\d{4})/i);
    if (romanianDateMatch) {
      const day = romanianDateMatch[1].padStart(2, '0');
      const month = romanianMonths[romanianDateMatch[2].toLowerCase()];
      const year = romanianDateMatch[3];
      entities.date = `${day}/${month}/${year}`;
    }
  }
  
  // Extract currency amounts with Romanian specifics
  const amountMatch = userMessage.match(/(\d+(?:[\.,]\d+)?)\s*(RON|EUR|USD|lei|euro|dolari)/i);
  if (amountMatch) {
    entities.amount = amountMatch[1].replace(',', '.');
    // Normalize currency names
    const currencyMap: Record<string, string> = {
      'lei': 'RON',
      'euro': 'EUR',
      'dolari': 'USD'
    };
    const detectedCurrency = amountMatch[2].toLowerCase();
    entities.currency = currencyMap[detectedCurrency] || amountMatch[2].toUpperCase();
  }
  
  // Extract company names
  const companyMatch = userMessage.match(/(?:compania|firma|societatea|sc)\s+([A-Z][A-Za-z0-9\s]+?)(?:\s+S\.?R\.?L\.?|\s+S\.?A\.?|,|\.|$)/i);
  if (companyMatch) {
    entities.company = companyMatch[1].trim();
  }
  
  // Extract locations (cities)
  const commonCities = ["București", "Cluj", "Timișoara", "Iași", "Constanța", "Brașov", "Craiova", "Sibiu"];
  for (const city of commonCities) {
    if (userMessage.toLowerCase().includes(city.toLowerCase())) {
      entities.location = city;
      break;
    }
  }
  
  return entities;
};

// Generate dynamic response based on intent and entities with enhanced language understanding
export const generateDynamicResponse = (intent: Intent, entities: Record<string, string>, conversationContext: string[] = []): string => {
  let response = intent.response;
  
  // Replace entity placeholders in response
  Object.entries(entities).forEach(([key, value]) => {
    response = response.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  
  // Add contextual awareness based on previous conversation
  if (conversationContext.length > 0 && !response.includes("contextul anterior")) {
    // Only add contextual references if they make sense for this intent
    if (intent.category === "banking" && conversationContext.some(ctx => ctx.includes("profit") || ctx.includes("financiar"))) {
      response += " Conform discuției noastre anterioare despre situația financiară, vă recomand să verificați și rapoartele trimestriale.";
    } else if (intent.category === "logistics" && conversationContext.some(ctx => ctx.includes("comandă") || ctx.includes("livrare"))) {
      response += " Ținând cont de întrebările anterioare despre livrări, vă pot oferi și detalii despre statusul flotei noastre.";
    }
  }
  
  return response;
};

// Advanced function to get AI response based on intent matching and entity extraction
export const getAdvancedAIResponse = (
  userMessage: string, 
  intents: Intent[], 
  conversationHistory: string[] = []
): { response: string, matchedIntent: Intent | null } => {
  const startTime = Date.now();
  
  // Find best matching intent with context awareness
  const matchedIntent = findBestMatchingIntent(userMessage, intents, conversationHistory);
  
  if (matchedIntent) {
    // Extract entities from user message
    const entities = extractEntities(userMessage);
    
    // Update intent usage analytics
    updateIntentUsage(matchedIntent.id);
    
    // Generate dynamic response with context awareness
    const response = generateDynamicResponse(matchedIntent, entities, conversationHistory);
    
    // Update response time analytics
    const responseTime = Date.now() - startTime;
    updateResponseTimeAnalytics(responseTime);
    
    return { response, matchedIntent };
  }
  
  // If no match but user message contains a question, provide a more helpful response
  if (userMessage.includes("?") || 
      userMessage.toLowerCase().includes("cum") || 
      userMessage.toLowerCase().includes("unde") || 
      userMessage.toLowerCase().includes("când")) {
    
    // Generate fallback response based on topic detection
    let fallbackResponse = "Îmi pare rău, nu am suficiente informații pentru a răspunde la această întrebare specifică. ";
    
    if (userMessage.toLowerCase().includes("cost") || 
        userMessage.toLowerCase().includes("preț") || 
        userMessage.toLowerCase().includes("bani") ||
        userMessage.toLowerCase().includes("factură")) {
      fallbackResponse += "Pot să vă ajut cu informații despre fluxul de numerar, rapoarte financiare sau optimizare de costuri. Ce anume vă interesează?";
    } else if (userMessage.toLowerCase().includes("comandă") || 
               userMessage.toLowerCase().includes("livrare") || 
               userMessage.toLowerCase().includes("transport")) {
      fallbackResponse += "Pot să vă ajut cu tracking de comenzi, optimizare de rute sau programare de livrări. Care dintre aceste aspecte vă interesează?";
    } else {
      fallbackResponse += "Vă pot ajuta cu informații despre fluxul de numerar, rapoarte financiare, tracking de comenzi sau optimizare de costuri.";
    }
    
    // Update analytics for no-match case
    updateNoMatchAnalytics();
    
    return { response: fallbackResponse, matchedIntent: null };
  }
  
  // Update analytics for no-match case
  updateNoMatchAnalytics();
  
  // Default response if no intent matches
  return { 
    response: "Îmi pare rău, nu am suficiente informații pentru a răspunde la această întrebare specifică. Vă pot ajuta cu informații despre fluxul de numerar, rapoarte financiare, tracking de comenzi sau optimizare de costuri.", 
    matchedIntent: null 
  };
};

// Update response time analytics
const updateResponseTimeAnalytics = (responseTime: number): void => {
  const analytics = getStoredAnalytics();
  
  // Calculate new average response time
  analytics.averageResponseTime = 
    (analytics.averageResponseTime * analytics.totalInteractions + responseTime) / 
    (analytics.totalInteractions + 1);
  
  saveAnalytics(analytics);
};

// Update analytics for no-match cases
const updateNoMatchAnalytics = (): void => {
  const analytics = getStoredAnalytics();
  analytics.totalInteractions += 1;
  saveAnalytics(analytics);
};

import { getStoredAnalytics, saveAnalytics, updateIntentUsage } from "@/models/Intent";
