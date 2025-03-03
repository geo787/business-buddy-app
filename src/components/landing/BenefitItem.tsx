
import { LucideIcon } from "lucide-react";

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitItem = ({ icon: Icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 text-center sm:text-left hover:bg-secondary/20 rounded-lg transition-colors">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-2 sm:mb-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
