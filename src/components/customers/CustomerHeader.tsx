
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CustomerHeaderProps {
  onAddCustomer: () => void;
}

const CustomerHeader = ({ onAddCustomer }: CustomerHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships.</p>
        </div>
      </div>
      <Button className="gap-2" onClick={onAddCustomer}>
        <PlusCircle size={16} />
        <span>Add Customer</span>
      </Button>
    </div>
  );
};

export default CustomerHeader;
