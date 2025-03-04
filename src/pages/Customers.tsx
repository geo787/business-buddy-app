
import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { 
  MoreHorizontal, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle,
  Download,
  Filter,
  User,
  Check,
  X,
  Info,
  Edit,
  Trash
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Mock customer data
const customersData = [
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
  const [customers, setCustomers] = useState(customersData);
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { toast } = useToast();
  const itemsPerPage = 5;
  
  // Filter customers based on search query and status filter
  useEffect(() => {
    let result = customers;
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(lowerCaseQuery) || 
        customer.email.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    if (selectedStatus) {
      result = result.filter(customer => customer.status === selectedStatus);
    }
    
    setFilteredCustomers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedStatus, customers]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
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

  const handleFilterByStatus = (status: string | null) => {
    setSelectedStatus(status);
    
    if (status) {
      toast({
        title: "Filter applied",
        description: `Showing ${status} customers only`,
      });
    } else {
      toast({
        title: "Filter removed",
        description: "Showing all customers",
      });
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    toast({
      title: "Customer deleted",
      description: "The customer has been removed successfully",
    });
  };

  const handleAddCustomer = () => {
    toast({
      title: "Add Customer",
      description: "This feature will be available soon!",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Customer data export in progress",
    });
    // In a real app, this would trigger an actual download
  };

  return (
    <div className="space-y-6">
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
        <Button className="gap-2" onClick={handleAddCustomer}>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 w-full sm:w-auto">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleFilterByStatus(null)}>
                <Check className="mr-2 h-4 w-4" />
                <span>All Customers</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterByStatus("active")}>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Active</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterByStatus("at-risk")}>
                <Check className="mr-2 h-4 w-4 text-yellow-500" />
                <span>At Risk</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterByStatus("inactive")}>
                <Check className="mr-2 h-4 w-4 text-red-500" />
                <span>Inactive</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-1 w-full sm:w-auto" onClick={handleExportData}>
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
                        <DropdownMenuItem onClick={() => handleDeleteCustomer(customer.id)}>
                          <Trash className="mr-2 h-4 w-4 text-red-500" />
                          <span className="text-red-500">Delete Customer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <User size={48} className="text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No customers found</p>
                    <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedStatus(null);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{Math.min(filteredCustomers.length, paginatedCustomers.length)}</strong> of <strong>{filteredCustomers.length}</strong> customers
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
