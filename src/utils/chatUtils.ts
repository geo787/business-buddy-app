
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

// Function to get AI response based on user input - now calls the advanced implementation
export const getAIResponse = (userMessage: string, intents: Intent[]): string => {
  const { response } = getAdvancedAIResponse(userMessage, intents);
  return response;
};
