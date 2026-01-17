"use client";

import Link from "next/link";
import { ChevronRight, Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

import { useEffect, useState } from "react";
type PdfRow = {
  file_id: string;
  trademark_id: string;
  mark_name: string;
  application_number: string | null;
  pdf_title: string | null;
};
import { useSearch } from "@/context/SearchContext";

export default function TrademarksPage() {
  const { searchQuery } = useSearch();

  const [rows, setRows] = useState<PdfRow[]>([]);

  useEffect(() => {
    fetch("/api/trademarks")
      .then(async res => {
        if (!res.ok) {
          throw new Error(`api-error: ${res.status}`);
        }
        return res.json();
      })
      .then((data: PdfRow[]) => setRows(data))
      .catch(err => console.error("Error fetching trademarks", err));
  }, []);

  const filtered = rows.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.mark_name.toLowerCase().includes(q) ||
      (item.application_number ?? "").toLowerCase().includes(q) ||
      (item.pdf_title ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 md:p-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <PageHeader
          title="Trademarks"
          subtitle="Manage all trademarks in real-time from Supabase"
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
          <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 apple-text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span>Mark</span>
            <span>PDF Title</span>
            <span>Application #</span>
            <span>Download</span>
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <Link
                key={item.application_number ?? item.file_id}
                href={`/dashboard/trademarks/${encodeURIComponent(String(item.application_number ?? item.file_id))}`}
                className="grid grid-cols-4 items-center px-4 py-3 apple-text-sm text-slate-800 hover:bg-slate-50/50 cursor-pointer"
              >
                <span className="font-semibold text-slate-900">{item.mark_name}</span>
                <span>{item.pdf_title ?? "-"}</span>
                <span>{item.application_number ?? "—"}</span>
                <Download className="h-4 w-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden bg-white rounded-xl border border-slate-200/50 overflow-hidden">
          <div className="divide-y divide-slate-200/50">
            {filtered.map((item) => (
              <Link
                key={item.application_number ?? item.file_id}
                href={`/dashboard/trademarks/${encodeURIComponent(String(item.application_number ?? item.file_id))}`}
                className="flex items-center justify-between p-4 hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 apple-text-base">{item.mark_name}</span>
                  <span className="text-slate-600 apple-text-sm">{item.pdf_title ?? "-"}</span>
                </div>
                <div className="flex items-center gap-2">
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
