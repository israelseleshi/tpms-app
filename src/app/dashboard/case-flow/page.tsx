"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  User,
  Eye
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

interface Case {
  id: string;
  client: string;
  trademark: string;
  currentStage: string;
  status: string;
  deadline: string;
  priority: string;
  attorney: string;
}

const caseFlowData: Case[] = [
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
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleViewDetails = (caseData: Case) => {
    setSelectedCase(caseData);
  };

  return (
    <div className="p-4 md:p-6 space-y-6" style={{ minHeight: '100vh' }}>
      <AnimatedWrapper animation="fadeIn">
        <PageHeader 
          title="Case Flow Management"
          subtitle="Track and manage trademark application workflows"
          sticky={false}
        />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <h2 className="apple-text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-blue)' }}>
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Total Cases</p>
                <p className="apple-text-xl font-semibold text-slate-900">24</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-orange)' }}>
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">In Progress</p>
                <p className="apple-text-xl font-semibold text-slate-900">15</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-red)' }}>
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Urgent</p>
                <p className="apple-text-xl font-semibold text-slate-900">3</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--apple-green)' }}>
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="apple-text-sm text-slate-600">Completed</p>
                <p className="apple-text-xl font-semibold text-slate-900">6</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="scaleUp" delay={0.2}>
        <div className="bg-white rounded-2xl border-0 shadow-sm p-4 lg:p-6 lg:mx-0">
          <h2 className="apple-text-xl font-semibold mb-4">Workflow Stages</h2>
          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between p-3 bg-slate-100 rounded-lg">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.name} className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: stage.color }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="apple-text-sm font-medium text-slate-700 ml-3">{stage.name}</span>
                  {index < stages.length - 1 && (
                    <div className="w-8 h-px bg-slate-300 ml-3"></div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Mobile View */}
          <div className="md:hidden space-y-4 p-3 bg-slate-100 rounded-lg">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.name} className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: stage.color }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="apple-text-sm font-medium text-slate-700 ml-3">{stage.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper animation="fadeIn" delay={0.3}>
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-white rounded-xl border border-slate-200/50 p-1 w-fit">
            <TabsTrigger value="active" className="apple-button">Active Cases</TabsTrigger>
            <TabsTrigger value="pending" className="apple-button">Pending Review</TabsTrigger>
            <TabsTrigger value="completed" className="apple-button">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card className="glass-card smooth-corners p-6">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="apple-text-lg">Active Cases</CardTitle>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full md:w-40 h-11 smooth-corners">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseFlowData.map((case_) => (
                    <div key={case_.id} className="bg-white rounded-xl border border-slate-200/50 p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="apple-text-base font-semibold text-slate-900">{case_.trademark}</p>
                          <p className="apple-text-sm text-slate-600">{case_.client}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="apple-text-xs smooth-corners"
                          style={{ 
                            backgroundColor: case_.status === 'pending' ? 'var(--apple-red)' : 
                                           case_.status === 'in-progress' ? 'var(--apple-orange)' : 
                                           'var(--apple-green)',
                            color: 'white'
                          }}
                        >
                          {case_.currentStage}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{case_.attorney}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{case_.deadline}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full apple-button" onClick={() => handleViewDetails(case_)}>
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
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
      </AnimatedWrapper>

      {selectedCase && (
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCase.trademark}</DialogTitle>
              <DialogDescription>{selectedCase.client}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right">Status</p>
                <div className="col-span-3">
                  <Badge 
                    variant="secondary" 
                    className="apple-text-xs smooth-corners"
                    style={{ 
                      backgroundColor: selectedCase.status === 'pending' ? 'var(--apple-red)' : 
                                     selectedCase.status === 'in-progress' ? 'var(--apple-orange)' : 
                                     'var(--apple-green)',
                      color: 'white'
                    }}
                  >
                    {selectedCase.currentStage}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right">Attorney</p>
                <p className="col-span-3">{selectedCase.attorney}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right">Deadline</p>
                <p className="col-span-3">{selectedCase.deadline}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
