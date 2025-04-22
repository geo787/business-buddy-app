
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B"];

interface IntentAnalyticsProps {
  intentUsageData: { name: string; value: number; }[];
  categoryData: { name: string; value: number; }[];
}

const IntentAnalytics = ({ intentUsageData, categoryData }: IntentAnalyticsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Intent-uri după utilizare</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {intentUsageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={intentUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {intentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              Nu există date de analiză disponibile
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Distribuție pe categorii</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {categoryData.length > 0 && categoryData.some(item => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              Nu există date de analiză pe categorii
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntentAnalytics;
