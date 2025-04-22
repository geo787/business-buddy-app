
import { Intent } from "@/models/Intent";
import { getAdvancedAIResponse } from "./nlpUtils";

// Simple Levenshtein distance implementation for fuzzy matching (legacy)
export const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  
  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }
  
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,        // deletion
        matrix[i][j - 1] + 1,        // insertion
        matrix[i - 1][j - 1] + cost  // substitution
      );
    }
  }
  
  return matrix[a.length][b.length];
};

// Legacy function to find matching intent based on user input
export const findMatchingIntent = (userMessage: string, intents: Intent[]): Intent | null => {
  const messageLower = userMessage.toLowerCase();
  
  for (const intent of intents) {
    for (const phrase of intent.trainingPhrases) {
      if (messageLower.includes(phrase.toLowerCase()) || 
          getLevenshteinDistance(messageLower, phrase.toLowerCase()) < 3) {
        return intent;
      }
    }
  }
  
  return null;
};

// Function to get AI response based on user input - now with conversation memory
export const getAIResponse = (userMessage: string, intents: Intent[], conversationHistory: string[] = []): string => {
  const { response } = getAdvancedAIResponse(userMessage, intents, conversationHistory);
  return response;
};

// New function to maintain conversation context for better response generation
export const getConversationContext = (messages: {content: string, sender: 'user' | 'assistant'}[], maxContextLength: number = 5): string[] => {
  // Get only the most recent messages to use as context
  const recentMessages = messages.slice(-maxContextLength * 2); // Get pairs of user/assistant messages
  
  // Extract just the content
  return recentMessages.map(message => message.content);
};

// Function to detect if the conversation has shifted topics
export const hasTopicShifted = (previousMessages: string[], currentMessage: string): boolean => {
  if (previousMessages.length === 0) return false;
  
  const previousKeywords = extractKeywords(previousMessages.join(" "));
  const currentKeywords = extractKeywords(currentMessage);
  
  // Calculate keyword overlap
  const overlap = currentKeywords.filter(keyword => previousKeywords.includes(keyword)).length;
  const overlapRatio = overlap / Math.min(currentKeywords.length, previousKeywords.length);
  
  // If less than 20% keywords overlap, consider it a topic shift
  return overlapRatio < 0.2;
};

// Helper function to extract important keywords from text
const extractKeywords = (text: string): string[] => {
  const tokens = text.toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(token => token.length > 3); // Only keep tokens of significant length
  
  // Filter out Romanian stop words
  const stopWords = ["pentru", "acest", "acesta", "care", "sunt", "este", "fost", "avea", "când", "peste", "astfel", "foarte"];
  return tokens.filter(token => !stopWords.includes(token));
};

// Function to generate follow-up questions based on the current conversation
export const generateFollowUpQuestions = (lastResponse: string, matchedIntent: Intent | null): string[] => {
  // Default follow-up questions
  const defaultQuestions = [
    "Aveți nevoie de mai multe detalii?",
    "Pot să vă ajut cu altceva?",
    "Doriți informații suplimentare despre acest subiect?"
  ];
  
  // If no matched intent, return default questions
  if (!matchedIntent) return defaultQuestions;
  
  // Generate follow-up questions based on intent category
  if (matchedIntent.category === "banking") {
    return [
      "Doriți să vedeți rapoartele financiare detaliate?",
      "Pot să vă ofer o analiză a fluxului de numerar?",
      "Aveți nevoie de informații despre optimizarea costurilor?"
    ];
  } else if (matchedIntent.category === "logistics") {
    return [
      "Doriți să verificați statusul unei comenzi specifice?",
      "Vă pot ajuta cu optimizarea rutelor de livrare?",
      "Aveți nevoie de informații despre programul de livrări?"
    ];
  }
  
  return defaultQuestions;
};
