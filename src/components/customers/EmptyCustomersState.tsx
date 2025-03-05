
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface EmptyCustomersStateProps {
  onClearFilters: () => void;
}

const EmptyCustomersState = ({ onClearFilters }: EmptyCustomersStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-8">
        <div className="flex flex-col items-center justify-center">
          <User size={48} className="text-gray-300 mb-2" />
          <p className="text-lg font-medium">No customers found</p>
          <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

// Need to import TableRow and TableCell here to avoid the error
import { TableRow, TableCell } from "@/components/ui/table";

export default EmptyCustomersState;
