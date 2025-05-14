
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TruckIcon, PackageSearch, MapPin, AlertCircle, Clock, Camera } from "lucide-react";
import DocumentScanner from "@/components/camera/DocumentScanner";

const Logistics = () => {
  const { toast } = useToast();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [scannedDocuments, setScannedDocuments] = useState<string[]>([]);
  
  const handleTrackPackage = () => {
    if (!trackingNumber) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să introduceți un număr de AWB valid",
        variant: "destructive",
      });
      return;
    }
    
    setIsTracking(true);
    
    // Simulate API call for tracking
    setTimeout(() => {
      setIsTracking(false);
      toast({
        title: "Pachet găsit",
        description: `Pachetul cu AWB ${trackingNumber} este în tranzit și va ajunge mâine`,
      });
    }, 1500);
  };
  
  const handleDocumentScanned = (imageData: string) => {
    setScannedDocuments((prev) => [...prev, imageData]);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Logistică</h1>
        <p className="text-muted-foreground">
          Gestionează și optimizează procesele logistice pentru afacerea ta
        </p>
      </div>
      
      <Tabs defaultValue="tracking" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex mb-4">
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <PackageSearch className="h-4 w-4 hidden sm:block" /> Tracking
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Camera className="h-4 w-4 hidden sm:block" /> Documente
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 hidden sm:block" /> Rute
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-primary" />
                Urmărire colet
              </CardTitle>
              <CardDescription>
                Introduceți numărul AWB pentru a verifica statusul pachetului
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Introduceți AWB (ex: 1234567890)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleTrackPackage} 
                  disabled={isTracking}
                  className="w-full sm:w-auto"
                >
                  {isTracking ? "Se caută..." : "Urmărește pachet"}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle size={16} />
                <span className="text-sm">Funcțiile de urmărire sunt disponibile pentru DHL, Fan Courier, și Cargus</span>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistici livrări</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total livrări această lună:</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livrări în termen:</span>
                    <span className="font-medium text-green-600">25 (89%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livrări întârziate:</span>
                    <span className="font-medium text-amber-600">3 (11%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Curieri frecvenți</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fan Courier:</span>
                    <span className="font-medium">12 livrări</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DHL:</span>
                    <span className="font-medium">8 livrări</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cargus:</span>
                    <span className="font-medium">5 livrări</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sameday:</span>
                    <span className="font-medium">3 livrări</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="grid md:grid-cols-2 gap-6">
            <DocumentScanner 
              title="Scanner AWB" 
              description="Scanați AWB-uri pentru tracking automat"
              onScan={handleDocumentScanned} 
            />
            
            <DocumentScanner 
              title="Scanner factură" 
              description="Scanați facturile pentru procesare automată"
              onScan={handleDocumentScanned} 
            />
          </div>
          
          {scannedDocuments.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Documente scanate recent</CardTitle>
                <CardDescription>
                  {scannedDocuments.length} documente scanate astăzi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {scannedDocuments.map((doc, index) => (
                    <div key={index} className="relative aspect-[3/4] rounded-md overflow-hidden">
                      <img 
                        src={doc}
                        alt={`Document ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: "Procesare în curs",
                    description: "Documentele sunt în curs de procesare"
                  });
                }}>
                  Procesează toate documentele
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="routes">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Optimizare rute de livrare</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Funcționalitatea de optimizare a rutelor va fi disponibilă în curând. Aceasta va ajuta la reducerea costurilor de transport și a timpului de livrare.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Logistics;
