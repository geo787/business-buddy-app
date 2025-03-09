
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

// Tokenize text into simple bag of words
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

// Get vector representation of text for similarity comparison
export const vectorize = (text: string, vocabulary: string[]): number[] => {
  const tokens = tokenize(text);
  const tf = calculateTF(tokens);
  
  return vocabulary.map(term => tf[term] || 0);
};

// Build vocabulary from training phrases
export const buildVocabulary = (intents: Intent[]): string[] => {
  const allTokens = new Set<string>();
  
  intents.forEach(intent => {
    intent.trainingPhrases.forEach(phrase => {
      tokenize(phrase).forEach(token => {
        allTokens.add(token);
      });
    });
  });
  
  return Array.from(allTokens);
};

// Find best matching intent using vector similarity
export const findBestMatchingIntent = (userMessage: string, intents: Intent[]): Intent | null => {
  if (intents.length === 0) return null;
  
  // Create vocabulary from all training phrases
  const vocabulary = buildVocabulary(intents);
  
  // Vectorize user message
  const userVector = vectorize(userMessage, vocabulary);
  
  let bestMatch: Intent | null = null;
  let highestSimilarity = 0.3; // Threshold to consider a match
  
  intents.forEach(intent => {
    intent.trainingPhrases.forEach(phrase => {
      const phraseVector = vectorize(phrase, vocabulary);
      const similarity = cosineSimilarity(userVector, phraseVector);
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = intent;
      }
    });
  });
  
  return bestMatch;
};

// Extract entities from user message (simple implementation)
export const extractEntities = (userMessage: string): Record<string, string> => {
  const entities: Record<string, string> = {};
  
  // Extract order numbers
  const orderMatch = userMessage.match(/#(\d+)/);
  if (orderMatch) {
    entities.orderNumber = orderMatch[1];
  }
  
  // Extract dates
  const dateMatch = userMessage.match(/(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{2,4})/);
  if (dateMatch) {
    entities.date = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
  }
  
  // Extract currency amounts
  const amountMatch = userMessage.match(/(\d+(?:\.\d+)?)\s*(RON|EUR|USD|lei)/i);
  if (amountMatch) {
    entities.amount = amountMatch[1];
    entities.currency = amountMatch[2].toUpperCase();
  }
  
  return entities;
};

// Generate dynamic response based on intent and entities
export const generateDynamicResponse = (intent: Intent, entities: Record<string, string>): string => {
  let response = intent.response;
  
  // Replace entity placeholders in response
  Object.entries(entities).forEach(([key, value]) => {
    response = response.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  
  return response;
};

// Advanced function to get AI response based on intent matching and entity extraction
export const getAdvancedAIResponse = (userMessage: string, intents: Intent[]): { response: string, matchedIntent: Intent | null } => {
  const startTime = Date.now();
  
  // Find best matching intent
  const matchedIntent = findBestMatchingIntent(userMessage, intents);
  
  if (matchedIntent) {
    // Extract entities from user message
    const entities = extractEntities(userMessage);
    
    // Update intent usage analytics
    updateIntentUsage(matchedIntent.id);
    
    // Generate dynamic response
    const response = generateDynamicResponse(matchedIntent, entities);
    
    // Update response time analytics
    const responseTime = Date.now() - startTime;
    updateResponseTimeAnalytics(responseTime);
    
    return { response, matchedIntent };
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
