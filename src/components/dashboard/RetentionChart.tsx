
import { useEffect, useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for the chart
const monthlyData = [
  { month: "Jan", retention: 78 },
  { month: "Feb", retention: 82 },
  { month: "Mar", retention: 85 },
  { month: "Apr", retention: 79 },
  { month: "May", retention: 82 },
  { month: "Jun", retention: 87 },
  { month: "Jul", retention: 90 },
  { month: "Aug", retention: 88 },
  { month: "Sep", retention: 92 },
  { month: "Oct", retention: 94 },
  { month: "Nov", retention: 91 },
  { month: "Dec", retention: 85 },
];

const quarterlyData = [
  { quarter: "Q1", retention: 82 },
  { quarter: "Q2", retention: 85 },
  { quarter: "Q3", retention: 90 },
  { quarter: "Q4", retention: 88 },
];

const annualData = [
  { year: "2020", retention: 76 },
  { year: "2021", retention: 82 },
  { year: "2022", retention: 85 },
  { year: "2023", retention: 91 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border shadow-md rounded-lg">
        <p className="text-sm font-medium">{`${label}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const RetentionChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    setIsMounted(true);
    
    const updateChartHeight = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        const newHeight = Math.max(300, width * 0.4);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    
    return () => {
      window.removeEventListener('resize', updateChartHeight);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="col-span-2 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <CardHeader>
        <CardTitle>Customer Retention</CardTitle>
        <CardDescription>
          Retention rate over time
        </CardDescription>
      </CardHeader>
      <CardContent ref={chartRef} className="px-1">
        <Tabs defaultValue="monthly" className="mb-4">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="retention" 
                  fill="url(#colorRetention)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="quarterly">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={quarterlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="retention" 
                  fill="url(#colorRetention)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="annual">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={annualData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="retention" 
                  fill="url(#colorRetention)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RetentionChart;
