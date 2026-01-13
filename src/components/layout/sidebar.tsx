"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Users, 
  BarChart3,
  Workflow,
  DollarSign,
  Menu
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trademarks", href: "/dashboard/trademarks", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Case Flow", href: "/dashboard/case-flow", icon: Workflow },
  { name: "Invoicing", href: "/dashboard/invoicing", icon: DollarSign },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar - Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden apple-button h-8 w-8 p-0 fixed top-4 left-4 z-40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 p-0">
          <div className="flex h-full flex-col">
            {/* Logo Section */}
            <div className="flex items-center gap-3 p-6 border-b border-slate-200/50">
              <div className="flex h-10 w-10 items-center justify-center smooth-corners apple-tint-bg shrink-0">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="apple-text-lg font-semibold text-slate-900 truncate">TradeMark Pro</h1>
                <p className="apple-text-sm text-slate-600">Portfolio Manager</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
              <p className="px-3 apple-text-sm font-semibold uppercase tracking-wide text-slate-600 whitespace-nowrap">
                MAIN MENU
              </p>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 smooth-corners px-3 py-3 apple-text-base font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "apple-tint-bg text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - Fixed */}
      <div className={cn(
        "hidden lg:flex h-screen w-48 flex-col glass-card border-0 border-r border-slate-200/50 transition-all duration-300",
        className
      )}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 items-center justify-center smooth-corners apple-tint-bg shrink-0">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="apple-text-lg font-semibold text-slate-900 truncate">TradeMark Pro</h1>
            <p className="apple-text-sm text-slate-600">Portfolio Manager</p>
          </div>
        </div>

        <div className="mx-4 h-px bg-slate-200/50" />

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          <p className="px-3 apple-text-sm font-semibold uppercase tracking-wide text-slate-600 whitespace-nowrap">
            MAIN MENU
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 smooth-corners px-3 py-3 apple-text-base font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "apple-tint-bg text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
