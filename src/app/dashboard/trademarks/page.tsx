"use client";

import Link from "next/link";
import { ChevronRight, Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

import { trademarks as allTrademarks } from "@/lib/mock-data";
import { useSearch } from "@/context/SearchContext";

export default function TrademarksPage() {
  const { searchQuery } = useSearch();

  const filteredTrademarks = allTrademarks.filter(
    (item) =>
      item.mark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <PageHeader 
          title="Trademarks"
          subtitle="Mock data for exploration. Filtering and search coming soon."
          actionButton={
            <button className="apple-button apple-tint-bg text-white gap-2 px-6 py-3 apple-text-sm font-semibold shadow-lg">
              <Plus className="h-4 w-4" />
              Add trademark
            </button>
          }
        />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        {/* Desktop View */}
        <div className="hidden md:block glass-card smooth-corners overflow-hidden mt-4">
          <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 apple-text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span>Mark</span>
            <span>Class</span>
            <span>Jurisdiction</span>
            <span>Status</span>
            <span>Application #</span>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredTrademarks.map((item) => (
              <Link
                key={item.appNo}
                href={`/dashboard/trademarks/${encodeURIComponent(item.appNo)}`}
                className="grid grid-cols-5 items-center px-4 py-3 apple-text-sm text-slate-800 hover:bg-slate-50/50 cursor-pointer"
              >
                <span className="font-semibold text-slate-900">{item.mark}</span>
                <span>Class {item.class}</span>
                <span>{item.jurisdiction}</span>
                <StatusBadge status={item.status} />
                <span className="text-slate-600">{item.appNo}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden bg-white rounded-xl border border-slate-200/50 overflow-hidden">
          <div className="divide-y divide-slate-200/50">
            {filteredTrademarks.map((item) => (
              <Link
                key={item.appNo}
                href={`/dashboard/trademarks/${encodeURIComponent(item.appNo)}`}
                className="flex items-center justify-between p-4 hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 apple-text-base">{item.mark}</span>
                  <span className="text-slate-600 apple-text-sm">{`Class ${item.class} • ${item.jurisdiction}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
