"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Workflow,
  DollarSign,
  BarChart3
} from "lucide-react";

const mobileNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "blue-600" },
  { name: "Trademarks", href: "/dashboard/trademarks", icon: FileText, color: "slate-600" },
  { name: "Clients", href: "/dashboard/clients", icon: Users, color: "green-600" },
  { name: "Case Flow", href: "/dashboard/case-flow", icon: Workflow, color: "purple-600" },
  { name: "Invoicing", href: "/dashboard/invoicing", icon: DollarSign, color: "orange-600" },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3, color: "pink-600" },
];

interface MobileTabBarProps {
  className?: string;
}

export function MobileTabBar({ className }: MobileTabBarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      // Fixed positioning at bottom with margins
      "fixed bottom-4 inset-x-4 z-50",
      // iOS-style translucent background with blur
      "bg-white/80 backdrop-blur-lg",
      // Rounded corners and border
      "rounded-2xl border-[0.5px] border-gray-200/50 shadow-lg",
      // Safe area padding for iPhone home indicator
      "pb-[env(safe-area-inset-bottom)]",
      // Reduced horizontal padding for 6 items
      "px-2",
      className
    )}>
      <div className="flex justify-around items-center py-2">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                // Flexible container for each tab
                "flex flex-col items-center justify-center gap-0.5",
                // Minimum touch target size (44px height)
                "min-h-11 flex-1",
                // Smooth transitions
                "transition-all duration-200",
                // Remove hover effects on touch devices
                "hover:opacity-80 active:scale-95"
              )}
            >
              {/* Icon container */}
              <div className={cn(
                "relative flex items-center justify-center",
                "transition-all duration-200"
              )}>
                <Icon 
                  className={cn(
                    // Icon sizing
                    "h-5 w-5",
                    // Active state: brand blue
                    isActive ? `text-${item.color}` : "text-[#8E8E93]",
                    // Smooth color transition
                    "transition-colors duration-200"
                  )} 
                />
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className={cn("absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full", `bg-${item.color}`)} />
                )}
              </div>
              
              {/* Label */}
              <span 
                className={cn(
                  // iOS-style extra small text for 6 items
                  "text-[9px] font-medium tracking-tight",
                  // Active state: brand blue, inactive: iOS gray
                  isActive ? `text-${item.color}` : "text-[#8E8E93]",
                  // Smooth color transition
                  "transition-colors duration-200",
                  // Prevent text selection
                  "select-none",
                  // Ensure consistent text alignment
                  "text-center"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
