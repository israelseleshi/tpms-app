import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type JurisdictionType = "ET" | "US" | "EU" | "UK" | "CN" | "JP";

interface JurisdictionBadgeProps {
  jurisdiction: JurisdictionType;
  className?: string;
  showFlag?: boolean;
}

const jurisdictionConfig = {
  "ET": {
    label: "ET",
    fullName: "Ethiopia",
    flag: "🇪🇹",
    className: "bg-green-100 text-green-900 border-green-200"
  },
  "US": {
    label: "US",
    fullName: "United States",
    flag: "🇺🇸",
    className: "bg-blue-100 text-blue-900 border-blue-200"
  },
  "EU": {
    label: "EU",
    fullName: "European Union",
    flag: "🇪🇺",
    className: "bg-indigo-100 text-indigo-900 border-indigo-200"
  },
  "UK": {
    label: "UK",
    fullName: "United Kingdom",
    flag: "🇬🇧",
    className: "bg-purple-100 text-purple-900 border-purple-200"
  },
  "CN": {
    label: "CN",
    fullName: "China",
    flag: "🇨🇳",
    className: "bg-red-100 text-red-900 border-red-200"
  },
  "JP": {
    label: "JP",
    fullName: "Japan",
    flag: "🇯🇵",
    className: "bg-pink-100 text-pink-900 border-pink-200"
  }
};

export function JurisdictionBadge({ 
  jurisdiction, 
  className,
  showFlag = true 
}: JurisdictionBadgeProps) {
  const config = jurisdictionConfig[jurisdiction];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium",
        config.className,
        className
      )}
      title={config.fullName}
    >
      {showFlag && <span className="mr-1">{config.flag}</span>}
      {config.label}
    </Badge>
  );
}
