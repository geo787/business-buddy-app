
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CustomerJourneyCard = () => {
  const journeySteps = [
    { id: 1, name: "Acquisition", count: 256, change: "+12%" },
    { id: 2, name: "Activation", count: 214, change: "+8%" },
    { id: 3, name: "Retention", count: 185, change: "+5%" },
    { id: 4, name: "Referral", count: 76, change: "+16%" },
    { id: 5, name: "Revenue", count: 142, change: "+9%" },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-base font-medium">Customer Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative">
              {index !== journeySteps.length - 1 && (
                <div className="absolute left-4 top-10 h-full w-px bg-muted-foreground/20" />
              )}
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
                  <span className="text-sm font-medium">{step.id}</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium leading-none">{step.name}</p>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {step.count} customers
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-green-500 font-medium">{step.change}</span> from last month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerJourneyCard;
