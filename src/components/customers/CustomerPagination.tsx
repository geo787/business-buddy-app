
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  filteredCustomersCount: number;
  visibleCustomersCount: number;
  onPageChange: (newPage: number) => void;
}

const CustomerPagination = ({
  currentPage,
  totalPages,
  filteredCustomersCount,
  visibleCustomersCount,
  onPageChange
}: CustomerPaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <strong>{Math.min(filteredCustomersCount, visibleCustomersCount)}</strong> of <strong>{filteredCustomersCount}</strong> customers
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="outline" 
          size="icon" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button 
          variant="outline" 
          size="icon" 
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CustomerPagination;
