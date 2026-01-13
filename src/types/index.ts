export interface Trademark {
  id: string;
  markName: string;
  description: string;
  jurisdiction: "ET" | "US" | "EU" | "UK" | "CN" | "JP";
  classes: string[];
  status: "filing" | "office-action" | "publication" | "registered" | "opposition" | "abandoned";
  clientName: string;
  clientEmail: string;
  filingDate?: string;
  applicationNumber?: string;
  registrationNumber?: string;
  priorityDate?: string;
  expiryDate?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  trademarkId: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  trademarkId: string;
  clientName: string;
  clientEmail: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  currency: "ETB" | "USD" | "EUR" | "GBP";
  subtotal: number;
  governmentFees: number;
  professionalFees: number;
  total: number;
  dueDate?: string;
  paidDate?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: "government-fee" | "professional-service";
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "attorney" | "paralegal" | "viewer";
  firm?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
