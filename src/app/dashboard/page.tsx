const stats = [
  { label: "Active marks", value: "142", detail: "Across ET / US / EU" },
  { label: "Office actions", value: "8", detail: "Awaiting response" },
  { label: "Invoices pending", value: "21", detail: "ETB 1.2M outstanding" },
  { label: "On-time filings", value: "98.6%", detail: "Past 90 days" },
];

const tasks = [
  { title: "Draft OA response", mark: "NOVA / ET", due: "13 Jan 2026" },
  { title: "File renewal", mark: "LumenPay / US", due: "16 Jan 2026" },
  { title: "Publication watch", mark: "Medessa / ET", due: "20 Jan 2026" },
];

const filings = [
  { mark: "Abyssinia Bank", status: "Filing", jurisdiction: "ET", class: "36" },
  { mark: "Blue Nile Coffee", status: "Office Action", jurisdiction: "ET", class: "30" },
  { mark: "ZenData", status: "Registered", jurisdiction: "EU", class: "42" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8" style={{ minHeight: '100vh' }}>
      <section className="glass-card smooth-corners p-6">
        <div className="flex flex-col gap-2">
          <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Welcome back</p>
          <h1 className="apple-text-2xl font-semibold tracking-tight text-slate-900">Portfolio overview</h1>
          <p className="apple-text-base text-slate-600">
            Mock data view — explore filings, office actions, and invoices without connecting Supabase.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="glass-card smooth-corners p-6">
            <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">{item.label}</p>
            <p className="mt-2 apple-text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="apple-text-base text-slate-600">{item.detail}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-card smooth-corners p-6">
          <div className="flex items-center justify-between">
            <h2 className="apple-text-lg font-semibold text-slate-900">Critical tasks</h2>
            <span className="smooth-corners px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide" style={{ backgroundColor: 'var(--apple-orange)', color: 'white' }}>
              Office action focus
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li
                key={task.title}
                className="smooth-corners bg-slate-50 px-4 py-3 apple-text-sm text-slate-800"
              >
                <div className="font-semibold text-slate-900">{task.title}</div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>{task.mark}</span>
                  <span className="apple-text-xs font-semibold text-slate-600">{task.due}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card smooth-corners p-6">
          <div className="flex items-center justify-between">
            <h2 className="apple-text-lg font-semibold text-slate-900">Recent filings</h2>
            <span className="apple-text-xs font-semibold uppercase tracking-wide text-slate-600">Mock data</span>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {filings.map((filing) => (
              <div key={filing.mark} className="flex items-center justify-between py-3 apple-text-sm text-slate-800">
                <div>
                  <p className="font-semibold text-slate-900">{filing.mark}</p>
                  <p className="apple-text-base text-slate-600">
                    Class {filing.class} · {filing.jurisdiction}
                  </p>
                </div>
                <span className="smooth-corners border border-slate-200 bg-slate-50 px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide text-slate-800">
                  {filing.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
