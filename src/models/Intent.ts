
export interface Intent {
  id: string;
  name: string;
  category: "banking" | "logistics";
  trainingPhrases: string[];
  response: string;
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
      response: "Comanda este în depozitul nostru. Va fi expediată mâine."
    },
    {
      id: "2",
      name: "check_profit",
      category: "banking",
      trainingPhrases: [
        "Cât a fost profitul în ultimele 3 luni?",
        "Arată-mi profitul trimestrial"
      ],
      response: "Profitul tău a fost de 45.000 RON în ultimele 3 luni. Poți vedea graficul detaliat accesând secțiunea Analytics din dashboard."
    }
  ];
};
