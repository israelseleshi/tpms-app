import { FormsTab } from "@/components/trademarks/forms-tab";

// Mock trademark data for testing
const mockTrademark = {
  appNo: "ET/2025/0142",
  mark: "Abyssinia Bank",
  class: "36",
  jurisdiction: "ET",
  status: "Filing",
  applicantName: "",
  city: "",
  nationality: ""
};

export default function EipaFormsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="apple-text-3xl font-bold text-slate-900 mb-2">EIPA Document Automation</h1>
        <p className="apple-text-base text-slate-600">
          Test the automated EIPA Form 01 generation feature with sample trademark data.
        </p>
      </div>

      <FormsTab trademark={mockTrademark} />
    </div>
  );
}
