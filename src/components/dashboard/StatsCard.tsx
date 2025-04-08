
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  className?: string;
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  positive,
  className,
  subtitle,
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {change && (
          <p
            className={cn(
              "text-xs mt-2",
              positive ? "text-green-500" : "text-airbnb-primary"
            )}
          >
            {positive ? "+" : "-"}
            {change} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
