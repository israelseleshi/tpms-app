"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-8" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="apple-spacing-lg">
        <h1 className="apple-text-2xl text-slate-900 mb-2">Reports & Analytics</h1>
        <p className="apple-text-base text-slate-600">Generate and view trademark practice reports</p>
      </div>

      {/* Export Report Section */}
      <Card className="glass-card smooth-corners p-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="apple-text-lg">Export Report</CardTitle>
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
        </CardHeader>
        <CardContent className="pt-0">
          <div className="apple-text-sm text-slate-600">
            Select report parameters and export your trademark data in CSV format for analysis.
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Summary */}
        <Card className="glass-card smooth-corners p-6">
          <CardHeader className="pb-4">
            <CardTitle className="apple-text-lg flex items-center gap-3">
              <FileText className="h-5 w-5 apple-tint" />
              Portfolio Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Total Trademarks</p>
                <p className="apple-text-2xl text-slate-900">142</p>
              </div>
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Registered</p>
                <p className="apple-text-2xl text-slate-900">98</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Pending</p>
                <p className="apple-text-2xl text-slate-900">44</p>
              </div>
              <div className="space-y-2">
                <p className="apple-text-sm font-medium text-slate-700">Total Clients</p>
                <p className="apple-text-2xl text-slate-900">28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next 30 Days */}
        <Card className="glass-card smooth-corners p-6">
          <CardHeader className="pb-4">
            <CardTitle className="apple-text-lg flex items-center gap-3">
              <Calendar className="h-5 w-5 apple-tint" />
              Next 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--apple-green)' }}></div>
                <div>
                  <p className="apple-text-sm font-medium text-slate-700">No renewals due</p>
                  <p className="apple-text-sm text-slate-600">All trademarks current</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="apple-text-sm text-slate-600">Office Actions</span>
                  <span className="apple-text-sm font-medium text-slate-900">3 pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="apple-text-sm text-slate-600">Filing Deadlines</span>
                  <span className="apple-text-sm font-medium text-slate-900">5 upcoming</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
