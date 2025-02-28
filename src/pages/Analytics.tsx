
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for charts
const retentionData = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 82 },
  { month: "Mar", rate: 85 },
  { month: "Apr", rate: 79 },
  { month: "May", rate: 82 },
  { month: "Jun", rate: 87 },
  { month: "Jul", rate: 90 },
  { month: "Aug", rate: 88 },
  { month: "Sep", rate: 92 },
  { month: "Oct", rate: 94 },
  { month: "Nov", rate: 91 },
  { month: "Dec", rate: 85 }
];

const churnData = [
  { month: "Jan", rate: 5.2 },
  { month: "Feb", rate: 4.8 },
  { month: "Mar", rate: 4.5 },
  { month: "Apr", rate: 5.1 },
  { month: "May", rate: 4.6 },
  { month: "Jun", rate: 3.9 },
  { month: "Jul", rate: 3.5 },
  { month: "Aug", rate: 3.2 },
  { month: "Sep", rate: 2.8 },
  { month: "Oct", rate: 2.6 },
  { month: "Nov", rate: 2.9 },
  { month: "Dec", rate: 3.3 }
];

const customerSegments = [
  { name: "Enterprise", value: 45 },
  { name: "Small Business", value: 30 },
  { name: "Freelancer", value: 25 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const lifetimeValueData = [
  { segment: "Enterprise", value: 8500 },
  { segment: "Small Business", value: 4200 },
  { segment: "Freelancer", value: 1800 }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed metrics about customer retention and behavior.
          </p>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Retention Rate Trend</CardTitle>
            <CardDescription>Monthly retention rate percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={retentionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <defs>
                    <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Retention Rate']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Retention Rate" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorRetention)"
                    dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Churn Rate</CardTitle>
            <CardDescription>Monthly customer churn percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={churnData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <defs>
                    <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Churn Rate']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Churn Rate" 
                    stroke="#FF6B6B" 
                    strokeWidth={2}
                    fill="url(#colorChurn)"
                    dot={{ stroke: '#FF6B6B', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#FF6B6B', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of customers by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Customer Lifetime Value</CardTitle>
            <CardDescription>Average LTV by customer segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lifetimeValueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Lifetime Value']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Lifetime Value" 
                    fill="url(#colorValue)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>Key metrics showing customer engagement and retention</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activity">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Daily Active Users</h3>
                  <p className="text-3xl font-bold">824</p>
                  <p className="text-xs text-green-500">+5.2% from last week</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Session</h3>
                  <p className="text-3xl font-bold">12m 24s</p>
                  <p className="text-xs text-green-500">+1.8% from last week</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Feature Usage</h3>
                  <p className="text-3xl font-bold">68%</p>
                  <p className="text-xs text-green-500">+4.6% from last week</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="growth" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">New Customers</h3>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-xs text-green-500">+12.4% from last month</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Conversion Rate</h3>
                  <p className="text-3xl font-bold">24.8%</p>
                  <p className="text-xs text-green-500">+2.1% from last month</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Growth Rate</h3>
                  <p className="text-3xl font-bold">7.2%</p>
                  <p className="text-xs text-green-500">+0.8% from last month</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="retention" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">1-Month Retention</h3>
                  <p className="text-3xl font-bold">72%</p>
                  <p className="text-xs text-green-500">+3.5% from last quarter</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">3-Month Retention</h3>
                  <p className="text-3xl font-bold">64%</p>
                  <p className="text-xs text-green-500">+2.8% from last quarter</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Satisfaction</h3>
                  <p className="text-3xl font-bold">4.7/5</p>
                  <p className="text-xs text-green-500">+0.2 from last quarter</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
