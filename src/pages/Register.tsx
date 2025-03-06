
import { Link } from "react-router-dom";
import LoginHeader from "@/components/auth/LoginHeader";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 p-4">
      <LoginHeader />

      <RegisterForm />

      <div className="mt-12 bg-white rounded-full px-8 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
        <Link to="/">
          <p className="text-blue-600 font-semibold">BACK TO HOME</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
