import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface IdeaFormData {
  idea_description: string;
  target_market: string;
  unique_value: string;
}

interface ValidationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  market_potential: string;
}

export const IdeaValidator = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();
  
  const form = useForm<IdeaFormData>({
    defaultValues: {
      idea_description: "",
      target_market: "",
      unique_value: "",
    }
  });

  const validateIdea = async (data: IdeaFormData) => {
    setIsValidating(true);
    
    try {
      const response = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Eroare la validarea ideii');
      }

      const result = await response.json();
      setValidationResult(result);
    } catch (error) {
      console.error('Eroare validare:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut valida ideea. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const saveProject = async () => {
    if (!validationResult) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          type: 'idea_validation',
          content: {
            form_data: form.getValues(),
            validation_result: validationResult
          }
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Proiect salvat cu succes!",
        description: "Validarea ideii a fost salvată în baza de date.",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Eroare la salvarea proiectului:', error);
      toast({
        title: "Eroare la salvare",
        description: error.message || "A apărut o eroare la salvarea proiectului.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(validateIdea)} className="space-y-6">
          <FormField
            control={form.control}
            name="idea_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrierea Ideii</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descrie ideea ta de afacere în detaliu..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="target_market"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Piața Țintă</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cine sunt clienții tăi potențiali? Ce probleme au?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unique_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Propunerea de Valoare Unică</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ce te face diferit de competiție? De ce ar alege clienții produsul/serviciul tău?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isValidating} className="w-full">
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se validează...
              </>
            ) : (
              'Validează Ideea'
            )}
          </Button>
        </form>
      </Form>

      {validationResult && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Rezultatul Validării</CardTitle>
                <CardDescription>
                  Analiza detaliată a ideii tale de afacere
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Scor:</span>
                <Badge className={`${getScoreColor(validationResult.score)} text-white`}>
                  {validationResult.score}/10
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-green-600 flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4" />
                Puncte Forte
              </h4>
              <ul className="space-y-1">
                {validationResult.strengths.map((strength, index) => (
                  <li key={index} className="text-sm pl-4">• {strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4" />
                Puncte Slabe
              </h4>
              <ul className="space-y-1">
                {validationResult.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm pl-4">• {weakness}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Sugestii de Îmbunătățire</h4>
              <ul className="space-y-1">
                {validationResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm pl-4">• {suggestion}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Potențialul Pieței</h4>
              <p className="text-sm text-muted-foreground">{validationResult.market_potential}</p>
            </div>

            <Button onClick={saveProject} disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se salvează...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvează Rezultatul
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};