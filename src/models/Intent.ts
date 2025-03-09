
export interface Intent {
  id: string;
  name: string;
  category: "banking" | "logistics";
  trainingPhrases: string[];
  response: string;
  usageCount?: number;
  lastUsed?: Date;
}

export interface ChatAnalytics {
  totalInteractions: number;
  intentUsage: Record<string, number>;
  mostUsedIntent?: {
    name: string;
    count: number;
  };
  averageResponseTime: number;
  sessionsCount: number;
  lastSessionDate?: Date;
}

export const getStoredIntents = (): Intent[] => {
  const storedIntents = localStorage.getItem('chatbot-intents');
  if (storedIntents) {
    return JSON.parse(storedIntents);
  }
  return [
    {
      id: "1",
      name: "check_order_status",
      category: "logistics",
      trainingPhrases: [
        "Unde este comanda mea?",
        "Status pentru comanda #123"
      ],
      response: "Comanda este în depozitul nostru. Va fi expediată mâine.",
      usageCount: 0
    },
    {
      id: "2",
      name: "check_profit",
      category: "banking",
      trainingPhrases: [
        "Cât a fost profitul în ultimele 3 luni?",
        "Arată-mi profitul trimestrial"
      ],
      response: "Profitul tău a fost de 45.000 RON în ultimele 3 luni. Poți vedea graficul detaliat accesând secțiunea Analytics din dashboard.",
      usageCount: 0
    }
  ];
};

export const getStoredAnalytics = (): ChatAnalytics => {
  const storedAnalytics = localStorage.getItem('chatbot-analytics');
  if (storedAnalytics) {
    return JSON.parse(storedAnalytics);
  }
  return {
    totalInteractions: 0,
    intentUsage: {},
    averageResponseTime: 0,
    sessionsCount: 0
  };
};

export const saveAnalytics = (analytics: ChatAnalytics): void => {
  localStorage.setItem('chatbot-analytics', JSON.stringify(analytics));
};

export const updateIntentUsage = (intentId: string): void => {
  const intents = getStoredIntents();
  const updatedIntents = intents.map(intent => {
    if (intent.id === intentId) {
      return {
        ...intent,
        usageCount: (intent.usageCount || 0) + 1,
        lastUsed: new Date()
      };
    }
    return intent;
  });
  
  localStorage.setItem('chatbot-intents', JSON.stringify(updatedIntents));
  
  // Update analytics
  const analytics = getStoredAnalytics();
  analytics.totalInteractions += 1;
  analytics.intentUsage[intentId] = (analytics.intentUsage[intentId] || 0) + 1;
  
  // Calculate most used intent
  let maxUsage = 0;
  let maxIntentName = '';
  
  Object.entries(analytics.intentUsage).forEach(([id, count]) => {
    if (count > maxUsage) {
      maxUsage = count;
      const intent = updatedIntents.find(i => i.id === id);
      maxIntentName = intent?.name || '';
    }
  });
  
  if (maxIntentName) {
    analytics.mostUsedIntent = {
      name: maxIntentName,
      count: maxUsage
    };
  }
  
  saveAnalytics(analytics);
};
