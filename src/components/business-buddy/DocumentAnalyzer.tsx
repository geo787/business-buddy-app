import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Loader2,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  insights: string[];
  actionItems: string[];
  risks: string[];
  opportunities: string[];
}

export const DocumentAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['text/plain', 'application/pdf', 'text/csv'];
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt')) {
        toast({
          title: "Format nesuportat",
          description: "Te rog să încarci fișiere TXT, PDF sau CSV.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fișier prea mare",
          description: "Dimensiunea maximă permisă este 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      setAnalysis(null);
    }
  };

  const analyzeDocument = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    try {
      // Read file content
      const fileContent = await readFileContent(selectedFile);
      
      const response = await fetch('https://xvufajrfsggkfegoctpv.supabase.co/functions/v1/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Analizează următorul document de business și oferă o analiză detaliată:

CONȚINUT DOCUMENT:
${fileContent}

Te rog să analizezi și să oferi:
1. Rezumat executiv
2. Puncte cheie (3-5)
3. Insights importante (3-5)
4. Acțiuni recomandate (3-5)
5. Riscuri identificate (2-4)
6. Oportunități (2-4)

Răspunde în limba română într-un format structurat și professional.`,
          conversationHistory: []
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the AI response into structured format
      const analysisText = data.reply;
      
      // Create structured analysis (simplified parsing)
      const structuredAnalysis: DocumentAnalysis = {
        summary: extractSection(analysisText, "rezumat", "Analiza completă a documentului dvs."),
        keyPoints: extractListItems(analysisText, ["punct", "key", "important"]),
        insights: extractListItems(analysisText, ["insight", "observ", "constat"]),
        actionItems: extractListItems(analysisText, ["acțiu", "recomand", "sugger"]),
        risks: extractListItems(analysisText, ["risc", "pericol", "amenin"]),
        opportunities: extractListItems(analysisText, ["oportunitat", "șans", "potential"])
      };
      
      setAnalysis(structuredAnalysis);
      
      toast({
        title: "✨ Analiză completă",
        description: "Documentul a fost analizat cu succes",
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Eroare la analiză:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut analiza documentul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // Limit content to first 8000 characters to avoid token limits
        resolve(content.substring(0, 8000));
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  };

  const extractSection = (text: string, keyword: string, fallback: string): string => {
    const lines = text.split('\n');
    const keywordLine = lines.findIndex(line => 
      line.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (keywordLine !== -1 && keywordLine + 1 < lines.length) {
      return lines[keywordLine + 1].trim() || fallback;
    }
    
    return fallback;
  };

  const extractListItems = (text: string, keywords: string[]): string[] => {
    const lines = text.split('\n');
    const items: string[] = [];
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.match(/^[-•\d\.]/)) {
        const cleanLine = trimmedLine.replace(/^[-•\d\.\s]+/, '').trim();
        if (cleanLine.length > 10) {
          items.push(cleanLine);
        }
      }
    });
    
    // If no structured items found, create some based on keywords
    if (items.length === 0) {
      keywords.forEach(keyword => {
        const relevantLines = lines.filter(line => 
          line.toLowerCase().includes(keyword.toLowerCase()) && line.length > 20
        );
        items.push(...relevantLines.slice(0, 2).map(line => line.trim()));
      });
    }
    
    return items.slice(0, 5); // Limit to 5 items
  };

  const generateReport = () => {
    if (!analysis || !selectedFile) return;
    
    const reportContent = `
RAPORT DE ANALIZĂ DOCUMENT
==========================

Document: ${selectedFile.name}
Data analizei: ${new Date().toLocaleDateString('ro-RO')}

REZUMAT EXECUTIV
================
${analysis.summary}

PUNCTE CHEIE
============
${analysis.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

INSIGHTS IMPORTANTE
===================
${analysis.insights.map((insight, i) => `${i + 1}. ${insight}`).join('\n')}

ACȚIUNI RECOMANDATE
===================
${analysis.actionItems.map((action, i) => `${i + 1}. ${action}`).join('\n')}

RISCURI IDENTIFICATE
====================
${analysis.risks.map((risk, i) => `${i + 1}. ${risk}`).join('\n')}

OPORTUNITĂȚI
============
${analysis.opportunities.map((opp, i) => `${i + 1}. ${opp}`).join('\n')}

---
Generat de Business Buddy AI
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analiza_${selectedFile.name.replace(/\.[^/.]+$/, "")}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Raport descărcat",
      description: "Raportul de analiză a fost salvat pe computerul tău",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Analizor Documente AI
          </CardTitle>
          <CardDescription>
            Încarcă documente de business pentru o analiză detaliată cu AI (TXT, PDF, CSV - max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".txt,.pdf,.csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-12 h-12 text-muted-foreground" />
              <span className="text-sm font-medium">
                {selectedFile ? selectedFile.name : "Selectează un document"}
              </span>
              <span className="text-xs text-muted-foreground">
                TXT, PDF, CSV (max 5MB)
              </span>
            </label>
          </div>
          
          {selectedFile && (
            <Button 
              onClick={analyzeDocument} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? "Analizez documentul..." : "Analizează cu AI"}
            </Button>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Rezultatul Analizei</CardTitle>
              <Button onClick={generateReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descarcă Raportul
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Rezumat Executiv</h4>
                  <p className="text-sm">{analysis.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Puncte Cheie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  Acțiuni Recomandate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Riscuri & Oportunități
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-red-600 mb-2">Riscuri:</h5>
                    <ul className="space-y-1">
                      {analysis.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">Oportunități:</h5>
                    <ul className="space-y-1">
                      {analysis.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};