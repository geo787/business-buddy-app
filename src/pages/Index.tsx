import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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
import { Discord } from "lucide-react";

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

  const sendEmailToUser = async (userEmail: string, userName: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const handleSendDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setEmailError("");
    setIsSubmitting(true);
    
    const success = await sendEmailToUser(email, name);
    
    setIsSubmitting(false);
    setShowDemoModal(false);
    
    if (success) {
      const demoRequest = {
        email,
        name,
        businessType,
        message,
        requestedAt: new Date().toISOString()
      };
      
      console.log("Demo request:", demoRequest);
      
      const existingRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      localStorage.setItem('demoRequests', JSON.stringify([...existingRequests, demoRequest]));
      
      toast({
        title: "Demo Link Sent",
        description: `A demo link has been sent to ${email}. Please check your inbox.`,
        duration: 5000,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to send demo link. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 bg-[#5865F2] rounded-md flex items-center justify-center">
            <Discord size={32} color="white" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-blue-600">BUSINESS BUDDY</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider -mt-1">Customer Retention Platform</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pt-16 pb-24">
        <div className="mb-6">
          <div className="h-24 w-24 bg-[#5865F2] rounded-md flex items-center justify-center">
            <Discord size={56} color="white" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-2 text-gray-900">Customer</h1>
        <h1 className="text-5xl font-bold mb-8 text-gray-900">Retention Platform</h1>
        
        <p className="max-w-xl text-gray-600 mb-12 text-lg">
          Transform your business with our powerful analytics. Track, analyze 
          and improve your customer metrics in real-time.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <Link to="/register">
            <Button className="px-8 py-6 text-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-md">
              Start Now 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-800"
            onClick={handleViewDemo}
          >
            View Demo
          </Button>
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Demo Access</DialogTitle>
            <DialogDescription>
              Enter your details to receive a link to our interactive demo and explore how Business Buddy can help your business.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSendDemo} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={emailError ? "border-red-500" : ""}
                required
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessType">
                Business Type
              </Label>
              <Input
                id="businessType"
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="E-commerce, SaaS, Retail, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">
                Additional Notes
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let us know your specific business needs..."
                rows={3}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Sending..." : "Send Demo Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
