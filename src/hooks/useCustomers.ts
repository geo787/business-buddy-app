
import { useState, useEffect } from "react";

// Define types
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  value: number;
  status: "active" | "at-risk" | "inactive";
  lastActive: string;
}

// Mock customer data
export const customersData: Customer[] = [
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

export const useCustomers = (itemsPerPage = 5) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(customersData);
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

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

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  return {
    searchQuery,
    setSearchQuery,
    customers,
    filteredCustomers,
    paginatedCustomers,
    currentPage,
    totalPages,
    selectedStatus,
    setSelectedStatus,
    handlePageChange,
    handleDeleteCustomer
  };
};
