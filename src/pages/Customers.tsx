
import { useToast } from "@/components/ui/use-toast";
import { useCustomers } from "@/hooks/useCustomers";
import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerFilters from "@/components/customers/CustomerFilters";
import CustomersTable from "@/components/customers/CustomersTable";
import CustomerPagination from "@/components/customers/CustomerPagination";

const Customers = () => {
  const { toast } = useToast();
  const {
    searchQuery,
    setSearchQuery,
    filteredCustomers,
    paginatedCustomers,
    currentPage,
    totalPages,
    selectedStatus,
    setSelectedStatus,
    handlePageChange,
    handleDeleteCustomer
  } = useCustomers();

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedStatus(null);
  };

  return (
    <div className="space-y-6">
      <CustomerHeader onAddCustomer={handleAddCustomer} />
      
      <CustomerFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterByStatus={handleFilterByStatus}
        onExportData={handleExportData}
      />

      <CustomersTable 
        paginatedCustomers={paginatedCustomers}
        onDeleteCustomer={(id) => {
          handleDeleteCustomer(id);
          toast({
            title: "Customer deleted",
            description: "The customer has been removed successfully",
          });
        }}
        onClearFilters={handleClearFilters}
      />

      <CustomerPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        filteredCustomersCount={filteredCustomers.length}
        visibleCustomersCount={paginatedCustomers.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Customers;
