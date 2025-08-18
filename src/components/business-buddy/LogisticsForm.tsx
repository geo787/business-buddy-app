import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface LogisticsFormData {
  resurse_necesare: string;
  furnizori: string;
  costuri_estimate: number;
  timp_estimat: number;
}

export const LogisticsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LogisticsFormData>({
    defaultValues: {
      resurse_necesare: "",
      furnizori: "",
      costuri_estimate: 0,
      timp_estimat: 0,
    }
  });

  const onSubmit = async (data: LogisticsFormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          type: 'logistics',
          content: data
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Proiect salvat cu succes!",
        description: "Datele logistice au fost salvate în baza de date.",
        variant: "default",
      });

      form.reset();
    } catch (error: any) {
      console.error('Eroare la salvarea proiectului:', error);
      toast({
        title: "Eroare la salvare",
        description: error.message || "A apărut o eroare la salvarea proiectului.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalii Logistice</CardTitle>
          <CardDescription>
            Completează informațiile despre resursele necesare pentru proiectul tău
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="resurse_necesare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resurse Necesare</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrie resursele necesare pentru proiect (ex: echipamente, spații, personal, etc.)"
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
                name="furnizori"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnizori</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lista furnizorilor potențiali sau actuali, includând contact și servicii oferite"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="costuri_estimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Costuri Estimate (RON)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timp_estimat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timp Estimat (zile)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvează Proiect
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};