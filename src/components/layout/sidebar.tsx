"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Users, 
  BarChart3,
  Workflow,
  DollarSign,
  Menu,
  Download
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trademarks", href: "/dashboard/trademarks", icon: FileText },
  { name: "EIPA Forms", href: "/dashboard/eipa-forms", icon: Download },
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Emit custom event when sidebar state changes
  const handleCollapseToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // Dispatch custom event for layout to listen
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('sidebarCollapse', {
        detail: { isCollapsed: newState }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      {/* Mobile Sidebar - Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
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
                    onClick={() => setIsMobileOpen(false)}
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

      {/* Desktop Sidebar - Collapsible */}
      <motion.div 
        className={cn(
          "hidden lg:flex h-screen flex-col glass-card border-0 border-r border-slate-200/50 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 p-6">
          {/* Hamburger Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="apple-button h-8 w-8 p-0 shrink-0 hover:bg-slate-100"
            onClick={handleCollapseToggle}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="h-4 w-4" />
            </motion.div>
          </Button>
          
          <motion.div 
            className="flex h-10 w-10 items-center justify-center smooth-corners apple-tint-bg shrink-0"
            layoutId="logo"
          >
            <Building2 className="h-6 w-6 text-white" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="min-w-0 flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                layoutId="text"
              >
                <h1 className="apple-text-lg font-semibold text-slate-900 truncate">TradeMark Pro</h1>
                <p className="apple-text-sm text-slate-600">Portfolio Manager</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-4 h-px bg-slate-200/50" />

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.p 
                className="px-3 apple-text-sm font-semibold uppercase tracking-wide text-slate-600 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                MAIN MENU
              </motion.p>
            )}
          </AnimatePresence>
          
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 smooth-corners px-3 py-3 apple-text-base font-medium transition-all whitespace-nowrap relative",
                    isActive
                      ? "apple-tint-bg text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
                    isCollapsed && "justify-center px-3"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        className="truncate"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <motion.div
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 glass-card smooth-corners px-2 py-1 apple-text-xs text-slate-900 whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}
