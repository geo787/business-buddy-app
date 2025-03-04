
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate credentials here
    // For now, let's simulate a successful login and redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 p-4">
      <div className="w-full max-w-md flex flex-col items-center text-white mb-8">
        <img 
          src="/lovable-uploads/780c12b9-63d2-49df-bf17-c8f6a083cbd0.png" 
          alt="Business Buddy Logo" 
          className="w-24 h-24 mb-4 object-contain" 
        />
        <h1 className="text-3xl font-bold text-center">BUSINESS BUDDY</h1>
        <p className="text-xl mt-2 text-center">CUSTOMER RETENTION PLATFORM</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
                <LogIn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div className="text-sm text-right">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Start a free trial
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-12 bg-white rounded-full px-8 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
        <p className="text-blue-600 font-semibold">SWIPE UP</p>
      </div>
    </div>
  );
};

export default Login;
