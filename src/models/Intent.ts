
export interface Intent {
  id: string;
  name: string;
  category: "banking" | "logistics";
  trainingPhrases: string[];
  response: string;
}
