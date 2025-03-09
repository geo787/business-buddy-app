
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatAnalytics as ChatAnalyticsType, getStoredAnalytics, getStoredIntents } from "@/models/Intent";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B"];

const ChatAnalytics = () => {
  const [analytics, setAnalytics] = useState<ChatAnalyticsType>(getStoredAnalytics());
  const [intents, setIntents] = useState(getStoredIntents());
  
  useEffect(() => {
    // Update analytics when component mounts
    setAnalytics(getStoredAnalytics());
  }, []);
  
  // Prepare data for intent usage chart
  const intentUsageData = Object.entries(analytics.intentUsage || {}).map(([intentId, count]) => {
    const intent = intents.find(i => i.id === intentId);
    return {
      name: intent?.name || "Unknown",
      value: count
    };
  });
  
  // Prepare data for category distribution chart
  const categoryData = intents.reduce((acc, intent) => {
    const usage = analytics.intentUsage[intent.id] || 0;
    acc[intent.category] = (acc[intent.category] || 0) + usage;
    return acc;
  }, {} as Record<string, number>);
  
  const categoryChartData = Object.entries(categoryData).map(([category, count]) => ({
    name: category === "banking" ? "Banking" : "Logistică",
    value: count
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot Analytics</CardTitle>
        <CardDescription>
          Monitorizarea utilizării și performanței chatbot-ului
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Total Interacțiuni</h3>
              <p className="text-2xl font-bold">{analytics.totalInteractions}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Timp mediu de răspuns</h3>
              <p className="text-2xl font-bold">{analytics.averageResponseTime.toFixed(0)} ms</p>
            </div>
          </div>
          
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
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Distribuție pe categorii</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {categoryChartData.length > 0 && categoryChartData.some(item => item.value > 0) ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categoryChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {categoryChartData.map((entry, index) => (
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
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Intent cel mai utilizat</h3>
            {analytics.mostUsedIntent ? (
              <p className="text-lg font-medium">{analytics.mostUsedIntent.name} ({analytics.mostUsedIntent.count} utilizări)</p>
            ) : (
              <p className="text-lg font-medium">Nu există date</p>
            )}
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Ultima sesiune</h3>
            <p className="text-lg font-medium">
              {analytics.lastSessionDate 
                ? new Date(analytics.lastSessionDate).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Nicio sesiune înregistrată'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAnalytics;
