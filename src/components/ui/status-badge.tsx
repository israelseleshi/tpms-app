import { cn } from "@/lib/utils";

const statusColors: { [key: string]: string } = {
  Filing: "bg-blue-100 text-blue-800",
  "Office Action": "bg-red-100 text-red-800",
  Publication: "bg-purple-100 text-purple-800",
  Registered: "bg-green-100 text-green-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "smooth-corners px-3 py-1 apple-text-xs font-semibold uppercase tracking-wide",
        statusColors[status] || "bg-slate-100 text-slate-800"
      )}
    >
      {status}
    </span>
  );
}
