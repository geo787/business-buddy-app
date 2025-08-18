import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Wand2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface LeanCanvasData {
  problem: string;
  solution: string;
  unique_value_proposition: string;
  unfair_advantage: string;
  customer_segments: string;
  key_metrics: string;
  channels: string;
  cost_structure: string;
  revenue_streams: string;
}

export const LeanCanvas = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LeanCanvasData>({
    defaultValues: {
      problem: "",
      solution: "",
      unique_value_proposition: "",
      unfair_advantage: "",
      customer_segments: "",
      key_metrics: "",
      channels: "",
      cost_structure: "",
      revenue_streams: "",
    }
  });

  const generateCanvas = async () => {
    const currentValues = form.getValues();
    const filledFields = Object.values(currentValues).filter(value => value.trim() !== "").length;
    
    if (filledFields < 2) {
      toast({
        title: "Informații insuficiente",
        description: "Completează cel puțin 2 câmpuri pentru a genera un canvas.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-canvas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentValues),
      });

      if (!response.ok) {
        throw new Error('Eroare la generarea canvas-ului');
      }

      const result = await response.json();
      
      // Populăm formularul cu datele generate
      Object.keys(result).forEach((key) => {
        if (key in currentValues) {
          form.setValue(key as keyof LeanCanvasData, result[key]);
        }
      });

      toast({
        title: "Canvas generat cu succes!",
        description: "AI-ul a completat câmpurile bazându-se pe informațiile tale.",
        variant: "default",
      });
    } catch (error) {
      console.error('Eroare generare canvas:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera canvas-ul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveCanvas = async () => {
    const data = form.getValues();
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          type: 'lean_canvas',
          content: data
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Canvas salvat cu succes!",
        description: "Lean Canvas-ul a fost salvat în baza de date.",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Eroare la salvarea canvas-ului:', error);
      toast({
        title: "Eroare la salvare",
        description: error.message || "A apărut o eroare la salvarea canvas-ului.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button onClick={generateCanvas} disabled={isGenerating} variant="outline">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se generează...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generează cu AI
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coloana 1 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">1. Problemă</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Care sunt problemele principale ale clienților tăi?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">4. Avantaj Nedrept</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="unfair_advantage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Ce nu poate fi copiat sau cumpărat ușor?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">7. Canale</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="channels"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Cum vei ajunge la clienți?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Coloana 2 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">2. Soluție</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="solution"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Care sunt caracteristicile principale ale produsului tău?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">3. Propunere de Valoare Unică</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="unique_value_proposition"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Mesajul convingător care explică de ce ești diferit"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">6. Metrici Cheie</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="key_metrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Ce metrici vor demonstra că afacerea ta funcționează?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Coloana 3 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">5. Segmente de Clienți</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="customer_segments"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Cine sunt utilizatorii și clienții tăi?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">8. Structura Costurilor</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="cost_structure"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Care sunt costurile principale?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">9. Fluxuri de Venituri</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="revenue_streams"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Cum vei genera bani?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Button onClick={saveCanvas} disabled={isSaving} className="w-full mt-6">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se salvează...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvează Canvas-ul
            </>
          )}
        </Button>
      </Form>
    </div>
  );
};