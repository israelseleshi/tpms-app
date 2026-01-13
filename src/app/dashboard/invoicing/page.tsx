"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Building,
  Download,
  Eye,
  Send
} from "lucide-react";

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
    <div className="p-6 space-y-8" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="apple-spacing-lg">
        <h1 className="apple-text-2xl text-slate-900 mb-2">Invoicing & Billing</h1>
        <p className="apple-text-base text-slate-600">Manage invoices, payments, and billing for trademark services</p>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-green)' }}>
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Total Revenue</p>
              <p className="apple-text-xl font-semibold text-slate-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Pending</p>
              <p className="apple-text-xl font-semibold text-slate-900">${pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Overdue</p>
              <p className="apple-text-xl font-semibold text-slate-900">${overdueAmount.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Total Invoices</p>
              <p className="apple-text-xl font-semibold text-slate-900">{invoiceData.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoice Management Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="glass-card smooth-corners p-1">
          <TabsTrigger value="all" className="apple-button">All Invoices</TabsTrigger>
          <TabsTrigger value="pending" className="apple-button">Pending</TabsTrigger>
          <TabsTrigger value="overdue" className="apple-button">Overdue</TabsTrigger>
          <TabsTrigger value="paid" className="apple-button">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="apple-text-lg">All Invoices</CardTitle>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 h-11 smooth-corners">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="professional">Professional Fees</SelectItem>
                      <SelectItem value="government">Government Filing</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="apple-button apple-tint-bg text-white h-11 px-6">
                    Create Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold">Invoice ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Case ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Type</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Issue Date</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Due Date</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Status</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                      <TableCell className="apple-text-sm font-medium">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-slate-400" />
                          {invoice.client}
                        </div>
                      </TableCell>
                      <TableCell className="apple-text-sm font-medium">{invoice.caseId}</TableCell>
                      <TableCell className="apple-text-sm">{invoice.type}</TableCell>
                      <TableCell className="apple-text-sm font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {invoice.issueDate}
                        </div>
                      </TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {invoice.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`apple-text-sm smooth-corners ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="apple-button apple-tint text-white h-8">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Pending Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold">Invoice ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Due Date</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData
                    .filter(inv => inv.status === 'pending')
                    .map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                      <TableCell className="apple-text-sm font-medium">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell className="apple-text-sm">{invoice.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="apple-button apple-tint text-white h-8">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Overdue Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold">Invoice ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Days Overdue</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData
                    .filter(inv => inv.status === 'overdue')
                    .map((invoice) => {
                    const daysOverdue = Math.ceil((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24));
                    return (
                    <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                      <TableCell className="apple-text-sm font-medium">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-semibold text-red-600">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell className="apple-text-sm text-red-600">{daysOverdue} days</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="apple-button bg-red-500 text-white h-8">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold">Invoice ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Amount</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Paid Date</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData
                    .filter(inv => inv.status === 'paid')
                    .map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                      <TableCell className="apple-text-sm font-medium">{invoice.id}</TableCell>
                      <TableCell className="apple-text-sm">{invoice.client}</TableCell>
                      <TableCell className="apple-text-sm font-semibold text-green-600">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell className="apple-text-sm text-green-600">{invoice.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="apple-button h-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
