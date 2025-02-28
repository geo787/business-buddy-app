
import { Users, DollarSign, ArrowUpCircle, ArrowDownCircle, BarChart2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your customer retention metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,286</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> 12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        {/* Stat Card 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> 4%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        {/* Stat Card 3 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Customer Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,860</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> 7%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        {/* Stat Card 4 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowDownCircle className="h-3 w-3 mr-1" /> 0.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Placeholder for chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Retention Overview</CardTitle>
            <CardDescription>
              Monthly retention rate over the past year
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">Retention Chart Placeholder</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest customer interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4 py-2">
                <p className="font-medium">New customer signup</p>
                <p className="text-sm text-muted-foreground">Jennifer Garcia - 2 hours ago</p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-2">
                <p className="font-medium">Subscription upgraded</p>
                <p className="text-sm text-muted-foreground">Michael Chen - 4 hours ago</p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-2">
                <p className="font-medium">Customer feedback received</p>
                <p className="text-sm text-muted-foreground">Sarah Wilson - 6 hours ago</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4 py-2">
                <p className="font-medium">Support ticket resolved</p>
                <p className="text-sm text-muted-foreground">David Rodriguez - 1 day ago</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Activities</Button>
            </div>
          </CardContent>
        </Card>

        {/* At-Risk Customers */}
        <Card>
          <CardHeader>
            <CardTitle>At-Risk Customers</CardTitle>
            <CardDescription>
              Customers that may need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium">MC</div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Last active: Yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium">JM</div>
                  <div>
                    <p className="font-medium">James Miller</p>
                    <p className="text-sm text-muted-foreground">Last active: Yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-medium">DR</div>
                  <div>
                    <p className="font-medium">David Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Last active: 1 week ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Contact</Button>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All At-Risk</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
