
import { Users, DollarSign, ArrowUpCircle, BarChart2 } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RetentionChart from "@/components/dashboard/RetentionChart";
import CustomerTable from "@/components/dashboard/CustomerTable";
import ChurnRateCard from "@/components/dashboard/ChurnRateCard";
import CustomerJourneyCard from "@/components/dashboard/CustomerJourneyCard";

const Dashboard = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 sm:mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor your key retention metrics and customer data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Customers"
          value="1,286"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Retention Rate"
          value="87%"
          icon={<ArrowUpCircle className="h-5 w-5" />}
          trend={{ value: 4, positive: true }}
          variant="success"
        />
        <StatCard
          title="Avg. Customer Value"
          value="$1,860"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 7, positive: true }}
        />
        <StatCard
          title="Active Segments"
          value="12"
          icon={<BarChart2 className="h-5 w-5" />}
          trend={{ value: 2, positive: true }}
          variant="glass"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <RetentionChart />
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <ChurnRateCard />
          <CustomerJourneyCard />
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Customers</h2>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Dashboard;
