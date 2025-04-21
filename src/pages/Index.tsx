import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MessageSquare, CheckCircle, BarChart2, Users } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const { toast } = useToast();
  const [showDemoModal, setShowDemoModal] = useState(false);
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

  const handleViewDemo = () => {
    setShowDemoModal(true);
    setEmail("");
    setEmailError("");
    setName("");
    setBusinessType("");
    setMessage("");
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
      
      console.log("Cerere demo:", demoRequest);
      
      const existingRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      localStorage.setItem('demoRequests', JSON.stringify([...existingRequests, demoRequest]));
      
      toast({
        title: "Link Demo Trimis",
        description: `Un link pentru demo a fost trimis la ${email}. Verificați-vă email-ul.`,
        duration: 5000,
      });
      
      setShowDemoModal(false);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <header className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare size={24} color="white" />
            </div>
            <span className="text-xl font-bold">Business Buddy</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Produse</span>
                <span className="group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <Link to="/analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Analiză Date</Link>
                  <Link to="/automation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Automatizare</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Soluții</span>
                <span className="group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <Link to="/customers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Management Clienți</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Resurse</span>
                <span className="group-hover:rotate-180 transition-transform">▼</span>
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Companie</span>
                <span className="group-hover:rotate-180 transition-transform">▼</span>
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Prețuri</span>
                <span className="group-hover:rotate-180 transition-transform">▼</span>
              </button>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="text-blue-700 hover:bg-blue-50">
                Conectare
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" className="bg-blue-900 hover:bg-blue-800 text-white">
                Înregistrare
              </Button>
            </Link>
          </div>
        </header>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
              Transformă Retenția Clienților
            </h2>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Monitorizează, analizează și îmbunătățește experiența clienților tăi cu instrumente puternice de insight și automatizare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <BarChart2 size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Analize Detaliate</h3>
              <p className="text-blue-700">Urmărește în timp real performanța și satisfacția clienților.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <Users size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Segmentare Clienți</h3>
              <p className="text-blue-700">Identifică și deservește fiecare segment de clienți.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <CheckCircle size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Retenție Clienți</h3>
              <p className="text-blue-700">Crește loialitatea și reduce abandonul.</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Începe Acum
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-blue-700 hover:bg-blue-50 border-blue-200"
              onClick={handleViewDemo}
            >
              Vizualizare Demo
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
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
    </div>
  );
};

export default Index;
