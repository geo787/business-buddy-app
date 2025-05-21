
import { Link } from "react-router-dom";

export function NavbarBrand() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
        <span className="text-white font-bold">BB</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight">Business Buddy</span>
        <span className="text-xs text-muted-foreground leading-none hidden sm:block">Smart Customer Retention</span>
      </div>
    </Link>
  );
}
