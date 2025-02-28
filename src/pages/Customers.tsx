
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
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle,
  Download,
  Filter
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock customer data
const customers = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    value: 2400,
    status: "active",
    lastActive: "Today"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    value: 1850,
    status: "at-risk",
    lastActive: "Yesterday"
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    value: 3200,
    status: "active",
    lastActive: "Today"
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    value: 950,
    status: "inactive",
    lastActive: "1 week ago"
  },
  {
    id: "5",
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    value: 1650,
    status: "active",
    lastActive: "2 days ago"
  },
  {
    id: "6",
    name: "James Miller",
    email: "james.miller@example.com",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    value: 2800,
    status: "at-risk",
    lastActive: "Yesterday"
  },
  {
    id: "7",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    value: 1400,
    status: "active",
    lastActive: "Today"
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships.</p>
        </div>
        <Button className="gap-2">
          <PlusCircle size={16} />
          <span>Add Customer</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-1 w-full sm:w-auto">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="gap-1 w-full sm:w-auto">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

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
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>${customer.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(customer.status)}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>7</strong> of <strong>7</strong> customers
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
