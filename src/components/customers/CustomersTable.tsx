
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Info, Edit, User, Trash } from "lucide-react";
import CustomerStatusBadge from "./CustomerStatusBadge";
import { Customer } from "@/hooks/useCustomers";
import EmptyCustomersState from "./EmptyCustomersState";

interface CustomersTableProps {
  paginatedCustomers: Customer[];
  onDeleteCustomer: (id: string) => void;
  onClearFilters: () => void;
}

const CustomersTable = ({ 
  paginatedCustomers, 
  onDeleteCustomer,
  onClearFilters
}: CustomersTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Customer</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCustomers.length > 0 ? (
            paginatedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>${customer.value.toLocaleString()}</TableCell>
                <TableCell>
                  <CustomerStatusBadge status={customer.status} />
                </TableCell>
                <TableCell>{customer.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Info className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Customer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>View Activity</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteCustomer(customer.id)}>
                        <Trash className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-red-500">Delete Customer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <EmptyCustomersState onClearFilters={onClearFilters} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersTable;
