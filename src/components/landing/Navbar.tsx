
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
