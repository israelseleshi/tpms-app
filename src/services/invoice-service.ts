import { Invoice } from "@/types";

export class InvoiceService {
  private static instance: InvoiceService;
  private mockData: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      trademarkId: "1",
      clientName: "Abyssinia Bank Group",
      clientEmail: "legal@abyssiniabank.et",
      status: "sent",
      currency: "ETB",
      subtotal: 420000,
      governmentFees: 200000,
      professionalFees: 220000,
      total: 420000,
      dueDate: "2025-01-15",
      items: [
        {
          id: "1",
          description: "EIPA Filing Fee - Class 36",
          quantity: 1,
          unitPrice: 200000,
          total: 200000,
          type: "government-fee",
        },
        {
          id: "2",
          description: "Professional Services - Trademark Search & Filing",
          quantity: 1,
          unitPrice: 220000,
          total: 220000,
          type: "professional-service",
        },
      ],
      createdAt: "2024-12-01T00:00:00Z",
      updatedAt: "2024-12-01T00:00:00Z",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      trademarkId: "2",
      clientName: "Blue Nile Coffee Co.",
      clientEmail: "contact@bluenilecoffee.et",
      status: "overdue",
      currency: "ETB",
      subtotal: 180000,
      governmentFees: 80000,
      professionalFees: 100000,
      total: 180000,
      dueDate: "2024-12-31",
      items: [
        {
          id: "3",
          description: "Office Action Response Fee",
          quantity: 1,
          unitPrice: 80000,
          total: 80000,
          type: "government-fee",
        },
        {
          id: "4",
          description: "Legal Services - Office Action Response",
          quantity: 1,
          unitPrice: 100000,
          total: 100000,
          type: "professional-service",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2024-12-15T00:00:00Z",
    },
  ];

  private constructor() {}

  public static getInstance(): InvoiceService {
    if (!InvoiceService.instance) {
      InvoiceService.instance = new InvoiceService();
    }
    return InvoiceService.instance;
  }

  async getInvoices(): Promise<Invoice[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData;
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockData.find(invoice => invoice.id === id) || null;
  }

  async getInvoicesByClient(clientEmail: string): Promise<Invoice[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.mockData.filter(invoice => invoice.clientEmail === clientEmail);
  }

  async createInvoice(data: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Promise<Invoice> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newInvoice: Invoice = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mockData.push(newInvoice);
    return newInvoice;
  }

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.mockData.findIndex(invoice => invoice.id === id);
    if (index === -1) return null;

    this.mockData[index] = {
      ...this.mockData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.mockData[index];
  }

  async updateInvoiceStatus(id: string, status: Invoice["status"], paidDate?: string): Promise<Invoice | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.mockData.findIndex(invoice => invoice.id === id);
    if (index === -1) return null;

    this.mockData[index] = {
      ...this.mockData[index],
      status,
      paidDate: status === "paid" ? paidDate || new Date().toISOString() : this.mockData[index].paidDate,
      updatedAt: new Date().toISOString(),
    };

    return this.mockData[index];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.mockData.findIndex(invoice => invoice.id === id);
    if (index === -1) return false;

    this.mockData.splice(index, 1);
    return true;
  }

  async getInvoiceStats(): Promise<{
    totalInvoices: number;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    overdueAmount: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const totalInvoices = this.mockData.length;
    const totalAmount = this.mockData.reduce((sum, inv) => sum + inv.total, 0);
    const paidAmount = this.mockData
      .filter(inv => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);
    const pendingAmount = this.mockData
      .filter(inv => inv.status === "sent")
      .reduce((sum, inv) => sum + inv.total, 0);
    const overdueAmount = this.mockData
      .filter(inv => inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.total, 0);

    return {
      totalInvoices,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
    };
  }
}
