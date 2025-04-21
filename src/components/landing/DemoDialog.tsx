
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoDialog = ({ open, onOpenChange }: DemoDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError("Email este obligatoriu");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Vă rugăm introduceți o adresă de email validă");
      return;
    }
    
    setEmailError("");
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const demoRequest = {
        email,
        name,
        businessType,
        message,
        requestedAt: new Date().toISOString()
      };
      
      const existingRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      localStorage.setItem('demoRequests', JSON.stringify([...existingRequests, demoRequest]));
      
      toast({
        title: "Link Demo Trimis",
        description: `Un link pentru demo a fost trimis la ${email}. Verificați-vă email-ul.`,
        duration: 5000,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite link-ul demo. Vă rugăm încercați din nou.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicită Acces Demo</DialogTitle>
          <DialogDescription>
            Introdu detaliile pentru a primi un link către demonstrația interactivă Business Buddy.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSendDemo} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplu.ro"
              className={emailError ? "border-red-500" : ""}
              required
            />
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Numele Dumneavoastră</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ion Popescu"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessType">Tipul Afacerii</Label>
            <Input
              id="businessType"
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="E-commerce, SaaS, Retail etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Observații Suplimentare</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Spuneți-ne despre nevoile specifice ale afacerii dumneavoastră..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Se trimite..." : "Trimite Link Demo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoDialog;
