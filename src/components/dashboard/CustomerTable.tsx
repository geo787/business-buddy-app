
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  value: number;
  activity: "active" | "at-risk" | "inactive";
  lastActive: string;
}

// Mock data
const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    value: 2400,
    activity: "active",
    lastActive: "Today"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    value: 1850,
    activity: "at-risk",
    lastActive: "Yesterday"
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    value: 3200,
    activity: "active",
    lastActive: "Today"
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    value: 980,
    activity: "inactive",
    lastActive: "2 weeks ago"
  },
  {
    id: "5",
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    value: 4500,
    activity: "active",
    lastActive: "3 days ago"
  }
];

const CustomerTable = () => {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityColor = (activity: Customer["activity"]) => {
    switch (activity) {
      case "active":
        return "bg-green-500";
      case "at-risk":
        return "bg-amber-500";
      case "inactive":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getActivityLabel = (activity: Customer["activity"]) => {
    switch (activity) {
      case "active":
        return "Active";
      case "at-risk":
        return "At Risk";
      case "inactive":
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer Value</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="group hover-scale origin-center">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{customer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", getActivityColor(customer.activity))}></span>
                      <Badge variant="outline" className="font-normal">
                        {getActivityLabel(customer.activity)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>${customer.value.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            View activity
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <strong>5</strong> of <strong>100</strong> customers
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
