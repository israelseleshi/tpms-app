import { mockClients, Client } from "@/lib/mock-data";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedWrapper } from "@/components/animations/AnimatedWrapper";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = mockClients.find((c: Client) => c.id.toString() === params.id);

  if (!client) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="apple-text-2xl font-semibold text-slate-900">Client Not Found</h1>
        <p className="apple-text-base text-slate-600">The requested client could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <AnimatedWrapper animation="fadeIn">
        <PageHeader title={client.name} subtitle={client.contact} />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slideIn" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card smooth-corners">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="h-4 w-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{client.country}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card smooth-corners">
            <CardHeader>
              <CardTitle>Trademarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-slate-500" />
                <span className="text-2xl font-semibold text-slate-900">{client.trademarks}</span>
                <span className="text-slate-600">active marks</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
