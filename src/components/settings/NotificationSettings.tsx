
import { useState } from "react";
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

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification settings have been updated successfully",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates via email</p>
          </div>
          <Switch 
            id="emailNotifications" 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive notifications in-app</p>
          </div>
          <Switch 
            id="pushNotifications" 
            checked={pushNotifications} 
            onCheckedChange={setPushNotifications} 
          />
        </div>
        
        <Button className="mt-4" onClick={handleSaveChanges}>
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
