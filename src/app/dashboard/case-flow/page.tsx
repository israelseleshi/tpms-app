"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Calendar,
  User,
  Building,
  Eye
} from "lucide-react";

const caseFlowData = [
  {
    id: "TM-2024-001",
    client: "TechCorp Inc.",
    trademark: "CloudSync Pro",
    currentStage: "Office Action",
    status: "pending",
    deadline: "2024-02-15",
    priority: "high",
    attorney: "Sarah Chen"
  },
  {
    id: "TM-2024-002", 
    client: "Global Foods Ltd.",
    trademark: "TasteBurst",
    currentStage: "Examination",
    status: "in-progress",
    deadline: "2024-03-01",
    priority: "medium",
    attorney: "Michael Park"
  },
  {
    id: "TM-2024-003",
    client: "Innovate Labs",
    trademark: "DataFlow",
    currentStage: "Publication",
    status: "completed",
    deadline: "2024-01-30",
    priority: "low",
    attorney: "Emily Rodriguez"
  }
];

const stages = [
  { name: "Filing", icon: FileText, color: "var(--apple-blue)" },
  { name: "Examination", icon: Eye, color: "var(--apple-orange)" },
  { name: "Office Action", icon: AlertCircle, color: "var(--apple-red)" },
  { name: "Publication", icon: FileText, color: "var(--apple-purple)" },
  { name: "Registration", icon: CheckCircle, color: "var(--apple-green)" }
];

export default function CaseFlowPage() {
  return (
    <div className="p-6 space-y-8" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="apple-spacing-lg">
        <h1 className="apple-text-2xl text-slate-900 mb-2">Case Flow Management</h1>
        <p className="apple-text-base text-slate-600">Track and manage trademark application workflows</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Total Cases</p>
              <p className="apple-text-xl font-semibold text-slate-900">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">In Progress</p>
              <p className="apple-text-xl font-semibold text-slate-900">15</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Urgent</p>
              <p className="apple-text-xl font-semibold text-slate-900">3</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card smooth-corners p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-green)' }}>
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="apple-text-sm text-slate-600">Completed</p>
              <p className="apple-text-xl font-semibold text-slate-900">6</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Workflow Stages */}
      <Card className="glass-card smooth-corners p-6">
        <CardHeader className="pb-4">
          <CardTitle className="apple-text-lg">Workflow Stages</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.name} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: stage.color }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="apple-text-sm font-medium text-slate-700">{stage.name}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-slate-400 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Case Management Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="glass-card smooth-corners p-1">
          <TabsTrigger value="active" className="apple-button">Active Cases</TabsTrigger>
          <TabsTrigger value="pending" className="apple-button">Pending Review</TabsTrigger>
          <TabsTrigger value="completed" className="apple-button">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="apple-text-lg">Active Cases</CardTitle>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 h-11 smooth-corners">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="filing">Filing</SelectItem>
                      <SelectItem value="examination">Examination</SelectItem>
                      <SelectItem value="office-action">Office Action</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="apple-button apple-tint-bg text-white h-11 px-6">
                    New Case
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-sm font-semibold">Case ID</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Client</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Trademark</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Current Stage</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Attorney</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Deadline</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Priority</TableHead>
                    <TableHead className="apple-text-sm font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseFlowData.map((case_) => (
                    <TableRow key={case_.id} className="hover:bg-slate-50/50">
                      <TableCell className="apple-text-sm font-medium">{case_.id}</TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-slate-400" />
                          {case_.client}
                        </div>
                      </TableCell>
                      <TableCell className="apple-text-sm font-medium">{case_.trademark}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className="apple-text-sm smooth-corners"
                          style={{ 
                            backgroundColor: case_.status === 'pending' ? 'var(--apple-red)' : 
                                           case_.status === 'in-progress' ? 'var(--apple-orange)' : 
                                           'var(--apple-green)',
                            color: 'white'
                          }}
                        >
                          {case_.currentStage}
                        </Badge>
                      </TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          {case_.attorney}
                        </div>
                      </TableCell>
                      <TableCell className="apple-text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {case_.deadline}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`apple-text-sm smooth-corners ${
                            case_.priority === 'high' ? 'border-red-500 text-red-700' :
                            case_.priority === 'medium' ? 'border-orange-500 text-orange-700' :
                            'border-green-500 text-green-700'
                          }`}
                        >
                          {case_.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="apple-button apple-tint text-white h-8">
                          View
                        </Button>
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
              <CardTitle className="apple-text-lg">Pending Review</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="apple-text-base text-slate-600">No cases pending review</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card className="glass-card smooth-corners p-6">
            <CardHeader className="pb-4">
              <CardTitle className="apple-text-lg">Completed Cases</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="apple-text-base text-slate-600">6 cases completed this month</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
