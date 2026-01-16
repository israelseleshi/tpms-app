"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  User,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title?: string;
  showLargeTitle?: boolean;
  className?: string;
}

export function MobileHeader({ 
  title = "Portfolio", 
  showLargeTitle = true,
  className 
}: MobileHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for large title transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky mobile header */}
      <header className={cn(
        // Fixed positioning for sticky behavior
        "fixed top-0 left-0 right-0 z-40",
        // iOS-style translucent background with blur
        "bg-white/80 backdrop-blur-lg",
        // Subtle bottom border
        "border-b-[0.5px] border-gray-200/50",
        // Safe area padding for notch
        "pt-[env(safe-area-inset-top)]",
        // Smooth transitions
        "transition-all duration-300",
        className
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo or Back button */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex h-8 w-8 items-center justify-center smooth-corners apple-tint-bg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            
            {/* Title - transitions from large to small */}
            <div className="flex-1 min-w-0">
              <h1 className={cn(
                // Base styles
                "font-semibold text-slate-900 truncate transition-all duration-300",
                // Large title when not scrolled
                showLargeTitle && !isScrolled 
                  ? "text-2xl" 
                  : "text-base"
              )}>
                {title}
              </h1>
              
              {/* Subtitle - only shows when scrolled */}
              {showLargeTitle && (
                <p className={cn(
                  "text-sm text-slate-600 truncate transition-all duration-300",
                  isScrolled ? "opacity-100" : "opacity-0 h-0"
                )}>
                  TradeMark Pro
                </p>
              )}
            </div>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative h-8 w-8 p-0 hover:bg-slate-100/80 active:scale-95 transition-transform"
            >
              <Bell className="h-4 w-4 text-slate-700" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            
            {/* Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-100/80 active:scale-95 transition-transform"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="apple-tint-bg text-white text-xs font-medium smooth-corners">
                    M
                  </AvatarFallback>
                </Avatar>
              </Button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-card smooth-corners border border-slate-200/50 shadow-lg z-50">
                  <div className="p-3 border-b border-slate-200/50">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="apple-tint-bg text-white text-xs font-medium smooth-corners">
                          M
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">mahikaalisha</p>
                        <p className="text-xs text-slate-600 truncate">Admin</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 h-8 px-2 text-sm hover:bg-slate-100/80"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" />
    </>
  );
}
