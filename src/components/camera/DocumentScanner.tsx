
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// This would be replaced with actual Capacitor camera import in a real implementation
// import { Camera, CameraResultType } from '@capacitor/camera';

interface DocumentScannerProps {
  onScan?: (imageData: string) => void;
  title?: string;
  description?: string;
}

const DocumentScanner = ({ 
  onScan, 
  title = "Document Scanner", 
  description = "Scan invoices, receipts, or other documents"
}: DocumentScannerProps) => {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const scanDocument = async () => {
    setIsScanning(true);
    
    try {
      // In a real implementation, this would use Capacitor's Camera API
      // const image = await Camera.getPhoto({
      //   quality: 90,
      //   allowEditing: true,
      //   resultType: CameraResultType.DataUrl
      // });
      
      // For demo purposes, we'll simulate a scan with a timeout
      setTimeout(() => {
        // Simulate a scanned document (base64 would come from Camera API in real implementation)
        const demoImage = "https://picsum.photos/300/400";
        setScannedImage(demoImage);
        
        if (onScan) {
          onScan(demoImage);
        }
        
        toast({
          title: "Document scanat",
          description: "Documentul a fost scanat cu succes și este gata pentru procesare.",
        });
        
        setIsScanning(false);
      }, 1500);
    } catch (error) {
      console.error("Error scanning document:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut scana documentul. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setScannedImage(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {scannedImage ? (
          <div className="relative w-full max-w-md mb-4">
            <img 
              src={scannedImage} 
              alt="Scanned document" 
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        ) : (
          <div className="w-full max-w-md h-64 bg-muted rounded-md flex flex-col items-center justify-center mb-4">
            <Camera size={48} className="text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              {isScanning ? "Scanare în curs..." : "Niciun document scanat"}
            </p>
          </div>
        )}
        
        <div className="w-full flex gap-4 justify-center">
          <Button
            onClick={scanDocument}
            disabled={isScanning}
            className="flex items-center gap-2"
          >
            <Camera size={16} />
            {isScanning ? "Se scanează..." : "Scanează document"}
          </Button>
          
          {scannedImage && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Scanează altul
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-center text-sm text-muted-foreground">
        <p>Scanarea funcționează pentru facturi, AWB-uri, și chitanțe</p>
      </CardFooter>
    </Card>
  );
};

export default DocumentScanner;
