import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Settings" subtitle="Manage your application settings" sticky={false} />
      <Card className="glass-card smooth-corners p-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Notification settings will be available here.</p>
        </CardContent>
      </Card>
      <Card className="glass-card smooth-corners p-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Appearance settings will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
