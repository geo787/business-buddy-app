
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareCode, Bot, Workflow } from "lucide-react";
import ChatbotConfiguration from "@/components/automation/ChatbotConfiguration";

const Automation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Automation</h1>
        <p className="text-muted-foreground">
          Configure AI chatbots and automation workflows for your business.
        </p>
      </div>

      <Tabs defaultValue="chatbot" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex mb-4">
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <Bot className="h-4 w-4 hidden sm:block" /> Chatbot AI
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4 hidden sm:block" /> Workflows
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chatbot">
          <ChatbotConfiguration />
        </TabsContent>
        
        <TabsContent value="workflows">
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
            <MessageSquareCode className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Workflow Automation</h3>
            <p className="text-center text-muted-foreground mt-2">
              Create automated workflows to connect your business systems and processes.
              This feature is coming soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Automation;
