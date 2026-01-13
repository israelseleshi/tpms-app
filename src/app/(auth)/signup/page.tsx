import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

const benefits = [
  "Centralized trademark registry with ET focus",
  "Automated task creation from status changes",
  "Clear split between government and professional fees",
];

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Trademark Practice Management System
            </p>
            <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">
              Create your firm workspace
            </CardTitle>
            <p className="text-sm text-slate-600">
              Set up once, then manage filings, deadlines, and billing in one place.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" method="POST" action="/dashboard">
              <div className="space-y-2">
                <Label htmlFor="firm" className="text-sm font-medium text-slate-800">
                  Firm name
                </Label>
                <Input id="firm" name="firm" type="text" placeholder="Enter your firm name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-800">
                  Work email
                </Label>
                <Input id="email" name="email" type="email" placeholder="Enter your work email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-800">
                  Password
                </Label>
                <PasswordInput id="password" name="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
              <p className="text-center text-sm text-slate-600">
                Already onboarded?{" "}
                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Fast start</p>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Mock data seeded for exploration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm text-slate-700">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-800">No setup required</p>
              <p className="mt-2">
                Use the preloaded matters, tasks, and invoices to demo workflows. Connect Supabase later when ready.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
