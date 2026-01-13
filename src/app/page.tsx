import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const highlights = [
    { label: "Jurisdictions", value: "US · EU · ET" },
    { label: "Live matters", value: "142" },
    { label: "On-time filings", value: "98.6%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-3">
            <Badge variant="outline" className="border-slate-200 text-slate-700">
              Trademark Practice Management System
            </Badge>
            <Badge className="bg-rose-100 text-rose-800">Beta</Badge>
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Consolidate filings, deadlines, and invoicing for your trademark practice.
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            Built with Next.js, Supabase, shadcn/ui, and Cult UI motion patterns. Manage portfolios, automate docketing
            workflows, and invoice without leaving your workspace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login" className="inline-flex items-center gap-2">
                Launch dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Create account</Link>
            </Button>
          </div>
        </div>
        <div className="grid w-full max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <Card key={item.label} className="border-slate-200">
              <CardHeader>
                <p className="text-sm text-slate-500">{item.label}</p>
                <CardTitle className="text-2xl text-slate-900">{item.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
          <Card className="md:col-span-2 border-slate-200 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="text-sm uppercase tracking-wide text-slate-300">Workflow snapshot</div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-900">
                Office action
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-100">
              <p>• Renewals due next 30 days: 12</p>
              <p>• Office actions awaiting response: 8</p>
              <p>• Filings drafted this week: 17</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
