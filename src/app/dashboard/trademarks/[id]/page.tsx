import { trademarks, Trademark } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

export default function TrademarkDetailPage({ params }: { params: { id: string } }) {
  const trademark = trademarks.find((tm: Trademark) => encodeURIComponent(tm.appNo) === params.id);

  if (!trademark) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="apple-text-2xl font-semibold text-slate-900">Trademark Not Found</h1>
        <p className="apple-text-base text-slate-600">The requested trademark could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <AnimatedWrapper animation="fadeIn">
        <PageHeader title={trademark.mark} subtitle={`Application #: ${trademark.appNo}`} />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card smooth-corners">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Class:</span>
                <span className="font-medium text-slate-900">{trademark.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Jurisdiction:</span>
                <span className="font-medium text-slate-900">{trademark.jurisdiction}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Status:</span>
                <StatusBadge status={trademark.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
