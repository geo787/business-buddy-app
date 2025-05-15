
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export function NavbarBrand() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
        <MessageSquare className="text-white h-5 w-5" />
      </div>
      <span className="font-bold text-lg">Business Buddy</span>
    </Link>
  );
}
