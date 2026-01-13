"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { MobileHeader } from "@/components/layout/mobile-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-black">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden lg:block">
          <Header />
        </div>

        {/* Mobile Header - Only shown on mobile */}
        <div className="lg:hidden">
          <MobileHeader />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 lg:px-6 pb-20 lg:pb-6">
          {children}
        </main>

        {/* Mobile Tab Bar - Only shown on mobile */}
        <div className="lg:hidden">
          <MobileTabBar />
        </div>
      </div>
    </div>
  );
}
