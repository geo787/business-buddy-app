
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const { toast } = useToast();

  // Check if dark mode is enabled on initial load
  useEffect(() => {
    // Check if dark mode is enabled in document
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({
        title: "Dark Mode Enabled",
        description: "Application is now in dark mode",
        duration: 3000,
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({
        title: "Light Mode Enabled",
        description: "Application is now in light mode",
        duration: 3000,
      });
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your appearance settings have been updated successfully",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize the appearance of the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Use a darker color scheme</p>
          </div>
          <Switch 
            id="darkMode" 
            checked={darkMode} 
            onCheckedChange={handleDarkModeToggle} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dataSharing">Data Sharing</Label>
            <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
          </div>
          <Switch 
            id="dataSharing" 
            checked={dataSharing} 
            onCheckedChange={setDataSharing} 
          />
        </div>
        
        <Button className="mt-4" onClick={handleSaveChanges}>
          Save Appearance Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
