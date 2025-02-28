
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  BarChart, 
  PieChart, 
  LineChart, 
  Download, 
  Share2, 
  Users, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your customer retention metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Last 30 Days</span>
            <span className="sm:hidden">30d</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,286</div>
                <div className="flex items-center text-xs text-green-500 font-medium">
                  <TrendingUp className="mr-1 h-3 w-3" /> +12%
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">145</div>
                <div className="flex items-center text-xs text-green-500 font-medium">
                  <TrendingUp className="mr-1 h-3 w-3" /> +22%
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Churned Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">38</div>
                <div className="flex items-center text-xs text-red-500 font-medium">
                  <TrendingDown className="mr-1 h-3 w-3" /> +4%
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center text-xs text-green-500 font-medium">
                  <TrendingUp className="mr-1 h-3 w-3" /> +2%
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>
                  New vs churned customers over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="flex items-center">
                  <BarChart className="h-6 w-6 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Growth Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Sources</CardTitle>
                <CardDescription>
                  Where your customers are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20">
                <div className="flex items-center">
                  <PieChart className="h-6 w-6 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Sources Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement</CardTitle>
                <CardDescription>
                  How customers interact with your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20">
                <div className="flex items-center">
                  <LineChart className="h-6 w-6 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Engagement Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="retention">
          <Card>
            <CardHeader>
              <CardTitle>Retention Cohorts</CardTitle>
              <CardDescription>
                Customer retention by month cohort
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <div className="flex items-center">
                <BarChart className="h-6 w-6 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Retention Cohort Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>
                Retention metrics by customer segment
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted/20">
              <div className="flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Segments Chart Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
