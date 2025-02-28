
import { Users, DollarSign, ArrowUpCircle, BarChart2 } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RetentionChart from "@/components/dashboard/RetentionChart";
import CustomerTable from "@/components/dashboard/CustomerTable";
import ChurnRateCard from "@/components/dashboard/ChurnRateCard";
import CustomerJourneyCard from "@/components/dashboard/CustomerJourneyCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your key retention metrics and customer data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RetentionChart />
        <div className="grid grid-cols-1 gap-6">
          <ChurnRateCard />
          <CustomerJourneyCard />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Dashboard;
