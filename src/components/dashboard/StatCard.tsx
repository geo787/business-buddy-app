
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva(
  "relative overflow-hidden rounded-xl p-6 shadow-sm transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-50 border border-green-100 dark:border-green-900/30",
        warning: "bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-50 border border-amber-100 dark:border-amber-900/30",
        danger: "bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-50 border border-red-100 dark:border-red-900/30",
        info: "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-50 border border-blue-100 dark:border-blue-900/30",
        glass: "glass-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive?: boolean;
  };
  footer?: React.ReactNode;
}

const StatCard = ({
  className,
  variant,
  title,
  value,
  icon,
  trend,
  footer,
  ...props
}: StatCardProps) => {
  return (
    <div className={cn(statCardVariants({ variant }), "animate-scale-in", className)} {...props}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      {trend && (
        <div className="flex items-center gap-1">
          <span className={cn("text-xs font-medium", {
            "text-green-600 dark:text-green-400": trend.positive,
            "text-red-600 dark:text-red-400": !trend.positive,
          })}>
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-border/40">
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatCard;
