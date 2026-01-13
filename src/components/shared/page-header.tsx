"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionButton?: React.ReactNode;
  sticky?: boolean;
}

export function PageHeader({ title, subtitle, actionButton, sticky = true }: PageHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={cn(
      "bg-slate-50/50 -mx-4 md:-mx-6 px-4 md:px-6 pt-4 pb-2 mb-6",
      sticky && "sticky top-0 z-10 backdrop-blur-lg border-b border-slate-200/50"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="apple-text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="apple-text-base text-slate-600">{subtitle}</p>
        </div>
        {actionButton}
      </div>
      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-lg border-0 bg-slate-200/50 py-2 pl-9 pr-3 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
