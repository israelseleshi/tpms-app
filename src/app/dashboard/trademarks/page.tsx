const trademarks = [
  { mark: "Abyssinia Bank", class: "36", jurisdiction: "ET", status: "Filing", appNo: "ET/2025/0142" },
  { mark: "Blue Nile Coffee", class: "30", jurisdiction: "ET", status: "Office Action", appNo: "ET/2025/0098" },
  { mark: "LumenPay", class: "42", jurisdiction: "US", status: "Publication", appNo: "US/1844229" },
  { mark: "ZenData", class: "42", jurisdiction: "EU", status: "Registered", appNo: "EU/998122" },
];

export default function TrademarksPage() {
  return (
    <div className="p-6 space-y-8" style={{ minHeight: '100vh' }}>
      <header className="flex items-start justify-between">
        <div>
          <p className="apple-text-sm font-semibold uppercase tracking-wide text-slate-600">Portfolio</p>
          <h1 className="apple-text-2xl font-semibold text-slate-900">Trademarks</h1>
          <p className="apple-text-base text-slate-600">Mock data for exploration. Filtering and search coming soon.</p>
        </div>
        <button className="apple-button apple-tint-bg text-white px-6 py-3 apple-text-sm font-semibold shadow-lg">
          Add trademark
        </button>
      </header>

      <div className="glass-card smooth-corners overflow-hidden">
        <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 apple-text-xs font-semibold uppercase tracking-wide text-slate-600">
          <span>Mark</span>
          <span>Class</span>
          <span>Jurisdiction</span>
          <span>Status</span>
          <span>Application #</span>
        </div>
        <div className="divide-y divide-slate-100">
          {trademarks.map((item) => (
            <div key={item.appNo} className="grid grid-cols-5 items-center px-4 py-3 apple-text-sm text-slate-800">
              <span className="font-semibold text-slate-900">{item.mark}</span>
              <span>Class {item.class}</span>
              <span>{item.jurisdiction}</span>
              <span className="smooth-corners border border-slate-200 bg-slate-50 px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide text-slate-800">
                {item.status}
              </span>
              <span className="text-slate-600">{item.appNo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
