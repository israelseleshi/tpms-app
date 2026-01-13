import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { DevelopmentMode } from "@/components/shared/development-mode";

const features = [
  "ET-first docketing with ETB currency",
  "Status-to-task automation for office actions",
  "Billing split between gov fees and professional fees",
];

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Trademark Practice Management System
            </p>
            <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">
              Sign in to your workspace
            </CardTitle>
            <p className="text-sm text-slate-600">
              Manage filings, deadlines, and invoicing in a single dashboard.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" method="POST" action="/dashboard">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-800">
                  Email
                </Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-800">
                  Password
                </Label>
                <PasswordInput id="password" name="password" placeholder="Enter your password" required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-slate-700">
                    Remember me
                  </Label>
                </div>
                <Link href="/reset" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <p className="text-center text-sm text-slate-600">
                No account?{" "}
                <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Create one
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Why TPMS</p>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Built for high-end trademark practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm text-slate-700">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-800">Mock data environment</p>
              <DevelopmentMode fallback="Demo mode.">
                <p className="mt-2">
                  This demo uses mock data for filings, deadlines, and invoices so you can explore the workflow without
                  connecting Supabase yet.
                </p>
              </DevelopmentMode>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
