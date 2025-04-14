import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import VirtualAssistant from "@/components/assistant/VirtualAssistant";
import { DiscordLogo } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 flex flex-col items-center">
        <div className="mb-4">
          <div className="h-16 w-16 bg-[#5865F2] rounded-md flex items-center justify-center">
            <DiscordLogo size={40} color="white" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-600 text-center">BUSINESS BUDDY</h1>
        <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">CUSTOMER RETENTION PLATFORM</p>
      </div>

      <RegisterForm />

      <div className="mt-8">
        <Link to="/">
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
        </Link>
      </div>
      
      <VirtualAssistant />
    </div>
  );
};

export default Register;
