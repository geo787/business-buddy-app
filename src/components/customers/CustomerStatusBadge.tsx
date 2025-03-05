
import { Badge } from "@/components/ui/badge";

interface CustomerStatusBadgeProps {
  status: string;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    case "at-risk":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    case "inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

const CustomerStatusBadge = ({ status }: CustomerStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default CustomerStatusBadge;
