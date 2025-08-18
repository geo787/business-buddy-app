import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Lightbulb, FileText, Truck } from "lucide-react";
import { AIChat } from "./AIChat";
import { IdeaValidator } from "./IdeaValidator";
import { LeanCanvas } from "./LeanCanvas";
import { LogisticsForm } from "./LogisticsForm";

export const BusinessBuddy = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
          Business Buddy AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Instrumentul tău AI pentru dezvoltarea afacerii - de la validarea ideii până la implementarea strategiei
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Chat AI
          </TabsTrigger>
          <TabsTrigger value="validator" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Validator Idei
          </TabsTrigger>
          <TabsTrigger value="canvas" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Lean Canvas
          </TabsTrigger>
          <TabsTrigger value="logistics" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Logistică
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Business Consultant</CardTitle>
              <CardDescription>
                Discută cu AI-ul despre afacerea ta și primește sfaturi personalizate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIChat />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validator" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Validator de Idei</CardTitle>
              <CardDescription>
                Evaluează potențialul ideii tale de afacere cu ajutorul AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IdeaValidator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canvas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lean Canvas Generator</CardTitle>
              <CardDescription>
                Creează un business model canvas cu asistența AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeanCanvas />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Planificare Logistică</CardTitle>
              <CardDescription>
                Planifică resursele, furnizorii și costurile pentru proiectul tău
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LogisticsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};