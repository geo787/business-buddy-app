
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Download, Check } from "lucide-react";

interface CustomerFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterByStatus: (status: string | null) => void;
  onExportData: () => void;
}

const CustomerFilters = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterByStatus,
  onExportData 
}: CustomerFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search customers..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1 w-full sm:w-auto">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onFilterByStatus(null)}>
              <Check className="mr-2 h-4 w-4" />
              <span>All Customers</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterByStatus("active")}>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Active</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterByStatus("at-risk")}>
              <Check className="mr-2 h-4 w-4 text-yellow-500" />
              <span>At Risk</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterByStatus("inactive")}>
              <Check className="mr-2 h-4 w-4 text-red-500" />
              <span>Inactive</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="gap-1 w-full sm:w-auto" onClick={onExportData}>
          <Download size={16} />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};

export default CustomerFilters;
