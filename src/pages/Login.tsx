
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import VirtualAssistant from "@/components/assistant/VirtualAssistant";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 p-4">
      <LoginHeader />

      {!showForgotPassword ? (
        <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
      ) : (
        <ForgotPasswordForm onBackToLogin={() => setShowForgotPassword(false)} />
      )}

      <div className="mt-12 bg-white rounded-full px-8 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
        <Link to="/">
          <p className="text-blue-600 font-semibold">BACK TO HOME</p>
        </Link>
      </div>
      
      {/* Add the virtual assistant component */}
      <VirtualAssistant />
    </div>
  );
};

export default Login;
