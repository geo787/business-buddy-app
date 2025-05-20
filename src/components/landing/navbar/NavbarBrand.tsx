
import { Link } from "react-router-dom";

export function NavbarBrand() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
        <span className="text-white font-bold">BB</span>
      </div>
      <span className="font-bold text-lg">Business Buddy</span>
    </Link>
  );
}
