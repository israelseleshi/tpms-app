"use client";

import { 
  FileText, 
  Clock, 
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-2 lg:space-y-4" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <div className="flex flex-col gap-2">
            <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Welcome back</p>
            <h1 className="apple-text-2xl font-semibold tracking-tight text-slate-900">Portfolio overview</h1>
            <p className="apple-text-sm text-slate-600">
              Mock data view — explore filings, office actions, and invoices without connecting Supabase.
            </p>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <h2 className="apple-text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Total Filings</p>
                <p className="apple-text-xl font-semibold text-slate-900">142</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Pending</p>
                <p className="apple-text-xl font-semibold text-slate-900">28</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Office Actions</p>
                <p className="apple-text-xl font-semibold text-slate-900">5</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-green)' }}>
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Completed</p>
                <p className="apple-text-xl font-semibold text-slate-900">109</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="scaleUp" delay={0.2}>
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <h2 className="apple-text-xl font-semibold mb-4">Critical Tasks</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 lg:py-2 border-b border-slate-100/50 mx-4 lg:mx-0 min-h-11">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="apple-text-sm font-medium text-slate-900">Office Action Response</p>
                  <p className="apple-text-xs text-slate-600">Blue Nile Coffee - ET/2025/0098</p>
                </div>
              </div>
              <span className="apple-text-xs text-red-600 font-medium">Due in 2 days</span>
            </div>
            <div className="flex items-center justify-between py-3 lg:py-2 border-b border-slate-100/50 mx-4 lg:mx-0 min-h-11">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="apple-text-sm font-medium text-slate-900">Filing Deadline</p>
                  <p className="apple-text-xs text-slate-600">LumenPay - US/1844229</p>
                </div>
              </div>
              <span className="apple-text-xs text-amber-600 font-medium">Due in 5 days</span>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="fadeIn" delay={0.3}>
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="apple-text-xl font-semibold">Recent Filings</h2>
            <button className="apple-text-sm text-blue-600 lg:hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-1">
            {[
              { mark: "Abyssinia Bank", status: "Filing", date: "2024-01-15" },
              { mark: "Blue Nile Coffee", status: "Office Action", date: "2024-01-14" },
              { mark: "LumenPay", status: "Publication", date: "2024-01-13" },
              { mark: "ZenData", status: "Registered", date: "2024-01-12" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 lg:py-2 border-b border-slate-100/50 mx-4 lg:mx-0 min-h-11 lg:hover:bg-slate-50 lg:transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                    style={{ 
                      backgroundColor: item.status === 'Filing' ? 'var(--apple-blue)' :
                                     item.status === 'Office Action' ? 'var(--apple-red)' :
                                     item.status === 'Publication' ? 'var(--apple-purple)' :
                                     'var(--apple-green)'
                    }}>
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="apple-text-sm font-medium text-slate-900">{item.mark}</p>
                    <p className="apple-text-xs text-slate-600">{item.status}</p>
                  </div>
                </div>
                <span className="apple-text-xs text-slate-500">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
