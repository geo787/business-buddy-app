
import { LucideIcon } from "lucide-react";

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitItem = ({ icon: Icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-secondary/20 rounded-lg transition-colors">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
