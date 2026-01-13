import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Profile" subtitle="Manage your personal information" sticky={false} />
      <Card className="glass-card smooth-corners p-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Mahika Alisha" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="mahika@example.com" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="apple-button apple-tint-bg text-white">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
