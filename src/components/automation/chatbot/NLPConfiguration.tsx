
import { Card, CardContent } from "@/components/ui/card";

const NLPConfiguration = () => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Entity Extraction</h2>
        <p className="text-muted-foreground mb-4">
          Chatbot-ul poate extrage automat următoarele entități din mesajele utilizatorilor:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Order Numbers</span>
            <span className="text-sm">Exemplu: #123456</span>
          </li>
          <li className="flex items-center">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Dates</span>
            <span className="text-sm">Exemplu: 15/03/2023</span>
          </li>
          <li className="flex items-center">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Currency Values</span>
            <span className="text-sm">Exemplu: 1500 RON</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Intent Matching</h2>
        <p className="text-muted-foreground mb-4">
          Sistemul utilizează o abordare avansată de potrivire a intent-urilor bazată pe:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">1</div>
            <div>
              <span className="font-medium">Tokenizare</span>
              <p className="text-sm text-muted-foreground">Împărțirea textului în cuvinte și prelucrarea pentru a elimina semnele de punctuație.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">2</div>
            <div>
              <span className="font-medium">Vectorizare</span>
              <p className="text-sm text-muted-foreground">Transformarea textului în vectori pentru comparație matematică.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">3</div>
            <div>
              <span className="font-medium">Similaritate Cosinus</span>
              <p className="text-sm text-muted-foreground">Calcularea similarității dintre mesajul utilizatorului și frazele de antrenament.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NLPConfiguration;
