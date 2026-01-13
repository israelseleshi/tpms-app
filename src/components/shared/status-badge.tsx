import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "filing" | "office-action" | "publication" | "registered" | "opposition" | "abandoned";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  "filing": {
    label: "Filing",
    className: "bg-blue-100 text-blue-900 border-blue-200"
  },
  "office-action": {
    label: "Office Action",
    className: "bg-amber-100 text-amber-900 border-amber-200"
  },
  "publication": {
    label: "Publication",
    className: "bg-purple-100 text-purple-900 border-purple-200"
  },
  "registered": {
    label: "Registered",
    className: "bg-green-100 text-green-900 border-green-200"
  },
  "opposition": {
    label: "Opposition",
    className: "bg-red-100 text-red-900 border-red-200"
  },
  "abandoned": {
    label: "Abandoned",
    className: "bg-slate-100 text-slate-900 border-slate-200"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
