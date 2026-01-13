"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  DollarSign, 
  Clock, 
  AlertCircle,
  Calendar,
  Building,
  Download,
  Eye,
  Send
} from "lucide-react";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

const invoiceData = [
  {
    id: "INV-2024-001",
    client: "TechCorp Inc.",
    caseId: "TM-2024-001",
    amount: 2500,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    type: "Professional Fees",
    attorney: "Sarah Chen"
  },
  {
    id: "INV-2024-002",
    client: "Global Foods Ltd.",
    caseId: "TM-2024-002",
    amount: 1800,
    status: "pending",
    dueDate: "2024-02-01",
    issueDate: "2024-01-16",
    type: "Government Filing",
    attorney: "Michael Park"
  },
  {
    id: "INV-2024-003",
    client: "Innovate Labs",
    caseId: "TM-2024-003",
    amount: 3200,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2023-12-27",
    type: "Professional Fees",
    attorney: "Emily Rodriguez"
  },
  {
    id: "INV-2024-004",
    client: "StartUp Ventures",
    caseId: "TM-2024-004",
    amount: 1500,
    status: "draft",
    dueDate: "2024-02-15",
    issueDate: "2024-01-20",
    type: "Consultation",
    attorney: "Sarah Chen"
  }
];

export default function InvoicingPage() {
  const totalRevenue = invoiceData
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const pendingAmount = invoiceData
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const overdueAmount = invoiceData
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <div className="bg-white rounded-xl border border-slate-200/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Billing</p>
              <h1 className="apple-text-2xl font-semibold tracking-tight text-slate-900">Invoicing & Billing</h1>
              <p className="apple-text-sm text-slate-600">Manage invoices, payments, and billing for trademark services</p>
            </div>
            <Button className="apple-button apple-tint-bg text-white gap-2 px-6 py-3">
              <FileText className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="bg-white rounded-xl border border-slate-200/50 p-6">
          <h2 className="apple-text-xl font-semibold mb-4">Financial Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-green)' }}>
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Total Revenue</p>
                <p className="apple-text-xl font-semibold text-slate-900">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="apple-text-xs text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Pending</p>
                <p className="apple-text-xl font-semibold text-slate-900">${pendingAmount.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="apple-text-xs text-amber-600">3 invoices</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Overdue</p>
                <p className="apple-text-xl font-semibold text-slate-900">${overdueAmount.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="apple-text-xs text-red-600">1 invoice</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Total Invoices</p>
                <p className="apple-text-xl font-semibold text-slate-900">{invoiceData.length}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="apple-text-xs text-blue-600">This month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="scaleUp" delay={0.2}>
        <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white rounded-xl border border-slate-200/50 p-1 w-fit">
          <TabsTrigger value="all" className="apple-button">All Invoices</TabsTrigger>
          <TabsTrigger value="pending" className="apple-button">Pending</TabsTrigger>
          <TabsTrigger value="overdue" className="apple-button">Overdue</TabsTrigger>
          <TabsTrigger value="paid" className="apple-button">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* All Invoices Table */}
          <div className="bg-white rounded-xl border border-slate-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="apple-text-xl font-semibold">All Invoices</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="apple-button">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="apple-button apple-tint-bg text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </div>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Invoice</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Client</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Case ID</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Amount</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Type</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Status</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Due Date</th>
                  <th className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600 text-left pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="apple-text-sm font-medium text-slate-900 py-2">{invoice.id}</td>
                    <td className="apple-text-sm text-slate-700 py-2">{invoice.client}</td>
                    <td className="apple-text-sm text-slate-600 py-2">{invoice.caseId}</td>
                    <td className="apple-text-sm font-semibold text-slate-900 py-2">${invoice.amount.toLocaleString()}</td>
                    <td className="apple-text-sm text-slate-600 py-2">{invoice.type}</td>
                    <td className="py-2">
                      <span className={cn(
                        "smooth-corners px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide",
                        invoice.status === 'paid' && "bg-green-100 text-green-700",
                        invoice.status === 'pending' && "bg-amber-100 text-amber-700",
                        invoice.status === 'overdue' && "bg-red-100 text-red-700",
                        invoice.status === 'draft' && "bg-slate-100 text-slate-700"
                      )}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="apple-text-sm text-slate-600 py-2">{invoice.dueDate}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="apple-button h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="apple-button h-8 w-8 p-0">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {/* Pending Invoices Table */}
          <Card className="glass-card smooth-corners">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Pending Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Invoice</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Status</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.filter(inv => inv.status === 'pending').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="apple-text-sm font-medium text-slate-900">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm text-slate-700">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-medium text-slate-900">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="smooth-corners bg-amber-100 px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide text-amber-700">
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="apple-text-sm text-slate-600">{invoice.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-6">
          {/* Overdue Invoices Table */}
          <Card className="glass-card smooth-corners">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Overdue Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Invoice</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Status</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.filter(inv => inv.status === 'overdue').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="apple-text-sm font-medium text-slate-900">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm text-slate-700">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-medium text-slate-900">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="smooth-corners bg-red-100 px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide text-red-700">
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="apple-text-sm text-slate-600">{invoice.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-6">
          {/* Paid Invoices Table */}
          <Card className="glass-card smooth-corners">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Invoice</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Status</TableHead>
                    <TableHead className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.filter(inv => inv.status === 'paid').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="apple-text-sm font-medium text-slate-900">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm text-slate-700">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-medium text-slate-900">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="smooth-corners bg-green-100 px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide text-green-700">
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="apple-text-sm text-slate-600">{invoice.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </AnimatedWrapper>
    </div>
  );
}
