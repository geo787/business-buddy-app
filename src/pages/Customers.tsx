
import { useState } from "react";
import { 
  PlusCircle, 
  Filter, 
  Download, 
  Upload, 
  ArrowUpDown, 
  Search, 
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Type definitions
interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "active" | "at-risk" | "churned";
  value: number;
  segment: string;
  lastActive: string;
  joinedDate: string;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "active",
    value: 2400,
    segment: "Enterprise",
    lastActive: "Today",
    joinedDate: "Jan 10, 2023"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "at-risk",
    value: 1850,
    segment: "Small Business",
    lastActive: "Yesterday",
    joinedDate: "Mar 22, 2023"
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "active",
    value: 3200,
    segment: "Enterprise",
    lastActive: "Today",
    joinedDate: "Feb 15, 2022"
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "churned",
    value: 980,
    segment: "Freelancer",
    lastActive: "2 weeks ago",
    joinedDate: "Apr 5, 2023"
  },
  {
    id: "5",
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "active",
    value: 4500,
    segment: "Enterprise",
    lastActive: "3 days ago",
    joinedDate: "Nov 18, 2022"
  },
  {
    id: "6",
    name: "James Smith",
    email: "james.smith@example.com",
    status: "active",
    value: 2100,
    segment: "Small Business",
    lastActive: "Today",
    joinedDate: "Jul 7, 2023"
  },
  {
    id: "7",
    name: "Jessica Brown",
    email: "jessica.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "at-risk",
    value: 1350,
    segment: "Freelancer",
    lastActive: "5 days ago",
    joinedDate: "Sep 12, 2023"
  },
  {
    id: "8",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    status: "churned",
    value: 750,
    segment: "Small Business",
    lastActive: "1 month ago",
    joinedDate: "Feb 28, 2023"
  }
];

const CustomerStatusIcon = ({ status }: { status: Customer["status"] }) => {
  switch (status) {
    case "active":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "at-risk":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "churned":
      return <XCircle className="h-4 w-4 text-gray-400" />;
    default:
      return null;
  }
};

const CustomerStatusBadge = ({ status }: { status: Customer["status"] }) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "at-risk":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">At Risk</Badge>;
    case "churned":
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Churned</Badge>;
    default:
      return null;
  }
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");

  const filteredCustomers = mockCustomers.filter(customer => {
    // Name or email search
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    // Segment filter
    const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
    
    return matchesSearch && matchesStatus && matchesSegment;
  });

  const statusCounts = {
    active: mockCustomers.filter(c => c.status === "active").length,
    atRisk: mockCustomers.filter(c => c.status === "at-risk").length,
    churned: mockCustomers.filter(c => c.status === "churned").length
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Customers</h1>
        <p className="text-muted-foreground">
          Manage and monitor your customer base.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.active}</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+5%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">At-Risk Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.atRisk}</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-amber-500 font-medium">+2%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Churned Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.churned}</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium">-1%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 p-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8 w-full sm:w-[240px] h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[110px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="churned">Churned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Small Business">Small Business</SelectItem>
                  <SelectItem value="Freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">CSV</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Excel</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Value
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      <CustomerStatusIcon status={customer.status} />
                      <CustomerStatusBadge status={customer.status} />
                    </div>
                  </TableCell>
                  <TableCell>${customer.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {customer.segment}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastActive}</TableCell>
                  <TableCell>{customer.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No customers found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredCustomers.length}</strong> of <strong>{mockCustomers.length}</strong> customers
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
