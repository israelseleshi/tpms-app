"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar } from "lucide-react";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <div className="bg-white rounded-xl border border-slate-200/50 p-6">
          <div className="flex flex-col gap-2">
            <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Analytics</p>
            <h1 className="apple-text-2xl font-semibold tracking-tight text-slate-900">Reports & Analytics</h1>
            <p className="apple-text-sm text-slate-600">Generate and view trademark practice reports</p>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="bg-white rounded-xl border border-slate-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="apple-text-xl font-semibold">Export Report</h2>
            <div className="flex items-center gap-3">
              <Select defaultValue="full">
                <SelectTrigger className="w-36 h-11 smooth-corners">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Portfolio</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="pending">Pending Only</SelectItem>
                </SelectContent>
              </Select>
              <Button className="apple-button apple-tint-bg text-white gap-2 h-11 px-6">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="apple-text-sm text-slate-600">
            Select report parameters and export your trademark data in CSV format for analysis.
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="scaleUp" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio Summary */}
          <div className="bg-white rounded-xl border border-slate-200/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="apple-text-lg">Portfolio Summary</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Total Trademarks</p>
                <p className="apple-text-xl font-semibold text-slate-900">142</p>
              </div>
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Registered</p>
                <p className="apple-text-xl font-semibold text-slate-900">98</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Pending</p>
                <p className="apple-text-xl font-semibold text-slate-900">44</p>
              </div>
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Total Clients</p>
                <p className="apple-text-xl font-semibold text-slate-900">28</p>
              </div>
            </div>
          </div>

          {/* Next 30 Days */}
          <div className="bg-white rounded-xl border border-slate-200/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h2 className="apple-text-lg">Next 30 Days</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="apple-text-sm font-medium text-slate-700">No renewals due</p>
                  <p className="apple-text-xs text-slate-600">All trademarks current</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="apple-text-sm text-slate-600">Office Actions</span>
                  <span className="apple-text-sm font-medium text-slate-900">3 pending</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="apple-text-sm text-slate-600">Filing Deadlines</span>
                  <span className="apple-text-sm font-medium text-slate-900">5 upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
