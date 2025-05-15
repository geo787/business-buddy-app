
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBarSearch() {
  return (
    <div className="relative w-full hidden sm:block">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search..." 
        className="pl-8 bg-background border-muted w-full max-w-[200px]" 
      />
    </div>
  );
}
