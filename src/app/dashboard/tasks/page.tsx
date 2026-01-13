import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tasks = [
  { title: "Draft OA response", mark: "NOVA / ET", due: "13 Jan 2026", status: "Action" },
  { title: "File renewal", mark: "LumenPay / US", due: "16 Jan 2026", status: "Upcoming" },
  { title: "Publication watch", mark: "Medessa / ET", due: "20 Jan 2026", status: "Monitor" },
  { title: "Certificate dispatch", mark: "ZenData / EU", due: "22 Jan 2026", status: "Fulfill" },
];

const statusTone: Record<string, string> = {
  Action: "bg-amber-100 text-amber-900",
  Upcoming: "bg-indigo-100 text-indigo-900",
  Monitor: "bg-slate-100 text-slate-900",
  Fulfill: "bg-emerald-100 text-emerald-900",
};

export default function TasksPage() {
  return (
    <main className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Workflow</p>
        <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
        <p className="text-sm text-slate-600">Mock task list focused on office actions and renewals.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.title} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">{task.title}</CardTitle>
                <p className="text-sm text-slate-600">{task.mark}</p>
              </div>
              <Badge className={statusTone[task.status] ?? "bg-slate-100 text-slate-900"}>{task.status}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">Due {task.due}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
