"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Bell, 
  Search, 
  User, 
  LogOut,
  Menu,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here (clear auth state, etc.)
    router.push("/login");
  };

  return (
    <header className={cn(
      "glass-card border-0 border-b border-slate-200/50 px-6 h-16 flex items-center justify-between",
      className
    )}>
      {/* Left side */}
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden apple-button h-8 w-8 p-0"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search trademarks, tasks, invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 smooth-corners h-10 w-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        <ThemeToggle />
        
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative apple-button h-8 w-8 p-0 shrink-0">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--apple-red)' }}></span>
        </Button>

        {/* Profile Section */}
        <div className="relative shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="apple-button h-10 px-3 gap-2 hover:bg-slate-100/80 flex items-center"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <Avatar className="h-6 w-6 shrink-0">
              <AvatarFallback className="apple-tint-bg text-white apple-text-sm font-medium smooth-corners">
                M
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block text-left min-w-0">
              <p className="apple-text-sm font-medium text-slate-900 truncate">mahikaalisha</p>
              <p className="apple-text-xs text-slate-600 truncate">Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </Button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 glass-card smooth-corners border border-slate-200/50 shadow-lg z-50">
              <div className="p-4 border-b border-slate-200/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="apple-tint-bg text-white apple-text-sm font-medium smooth-corners">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="apple-text-sm font-medium text-slate-900">mahikaalisha</p>
                    <p className="apple-text-xs text-slate-600">Admin</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="apple-button w-full justify-start gap-2 h-9 px-3"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="apple-button w-full justify-start gap-2 h-9 px-3 text-red-600 hover:bg-red-50/80"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
