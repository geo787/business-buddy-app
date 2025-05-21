
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-0 bg-card/60 backdrop-blur shadow-md hover:shadow-lg transition-all hover:scale-105 duration-300 overflow-hidden group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center relative z-10">
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
