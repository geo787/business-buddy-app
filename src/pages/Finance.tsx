
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, BarChart3, Calculator, FileText, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Finance = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("12");
  const [interestRate, setInterestRate] = useState("5");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  
  const calculateLoan = () => {
    if (!amount || !months || !interestRate) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile",
        variant: "destructive",
      });
      return;
    }
    
    const principal = parseFloat(amount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(months);
    
    const payment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / 
                   (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    setMonthlyPayment(Math.round(payment * 100) / 100);
    
    toast({
      title: "Calculat cu succes",
      description: `Plata lunară estimată: ${Math.round(payment * 100) / 100} RON`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Finanțe</h1>
        <p className="text-muted-foreground">
          Instrumente și analize financiare pentru dezvoltarea afacerii tale
        </p>
      </div>
      
      <Tabs defaultValue="cashflow" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex mb-4">
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 hidden sm:block" /> Cash Flow
          </TabsTrigger>
          <TabsTrigger value="loans" className="flex items-center gap-2">
            <Calculator className="h-4 w-4 hidden sm:block" /> Împrumuturi
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <FileText className="h-4 w-4 hidden sm:block" /> Planificare
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cashflow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Situație flux numerar
              </CardTitle>
              <CardDescription>
                Vizualizează și optimizează fluxul de numerar pentru afacerea ta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Venituri Aprilie 2025</span>
                    <span className="text-sm font-medium">85,000 RON</span>
                  </div>
                  <Progress value={85} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cheltuieli Aprilie 2025</span>
                    <span className="text-sm font-medium">64,000 RON</span>
                  </div>
                  <Progress value={64} className="bg-gray-200 dark:bg-gray-700">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: "64%" }} />
                  </Progress>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Flux net de numerar:</span>
                    <span className="font-bold text-green-600">+21,000 RON</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Raport generat",
                  description: "Raportul detaliat a fost trimis pe email"
                });
              }}>
                Generează raport detaliat
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prognoză venituri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mai 2025:</span>
                    <span className="font-medium">89,500 RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Iunie 2025:</span>
                    <span className="font-medium">93,000 RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Iulie 2025:</span>
                    <span className="font-medium">96,500 RON</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top cheltuieli</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Salarii:</span>
                    <span className="font-medium">32,000 RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing:</span>
                    <span className="font-medium">12,000 RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chirii:</span>
                    <span className="font-medium">8,500 RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilități:</span>
                    <span className="font-medium">4,800 RON</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Calculator împrumut
              </CardTitle>
              <CardDescription>
                Calculează ratele lunare pentru diferite tipuri de împrumuturi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Suma împrumutului (RON)</label>
                    <Input
                      type="number"
                      placeholder="ex: 50000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Perioada (luni)</label>
                    <Input
                      type="number"
                      placeholder="ex: 12"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rata dobânzii (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="ex: 5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                
                <Button onClick={calculateLoan} className="w-full">Calculează</Button>
                
                {monthlyPayment !== null && (
                  <div className="p-4 bg-muted rounded-lg mt-2">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Plata lunară estimată</div>
                      <div className="text-2xl font-bold">{monthlyPayment} RON</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Total de rambursat: {(monthlyPayment * parseInt(months)).toFixed(2)} RON
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="planning">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Planificare financiară</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Funcționalitatea de planificare financiară va fi disponibilă în curând. Aceasta va include template-uri pentru planuri financiare și analize predictive.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => {
                toast({
                  title: "Notificare activată",
                  description: "Vei fi notificat când această funcționalitate va fi disponibilă"
                });
              }}>
                Notifică-mă când e disponibil
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
