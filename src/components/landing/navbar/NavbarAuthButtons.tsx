
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NavbarAuthButtons() {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link to="/login">
        <Button variant="ghost" size="sm">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="default" size="sm">Sign Up</Button>
      </Link>
    </div>
  );
}
