import { Trademark } from "@/types";

export class TrademarkService {
  private static instance: TrademarkService;
  private mockData: Trademark[] = [
    {
      id: "1",
      markName: "Abyssinia Bank",
      description: "Financial services including banking, investment, and insurance",
      jurisdiction: "ET",
      classes: ["36"],
      status: "filing",
      clientName: "Abyssinia Bank Group",
      clientEmail: "legal@abyssiniabank.et",
      filingDate: "2024-12-01",
      applicationNumber: "ET-2024-0001",
      tags: ["banking", "financial"],
      createdAt: "2024-12-01T00:00:00Z",
      updatedAt: "2024-12-01T00:00:00Z",
    },
    {
      id: "2",
      markName: "Blue Nile Coffee",
      description: "Premium coffee beans and related products",
      jurisdiction: "ET",
      classes: ["30"],
      status: "office-action",
      clientName: "Blue Nile Coffee Co.",
      clientEmail: "contact@bluenilecoffee.et",
      filingDate: "2024-11-15",
      applicationNumber: "ET-2024-0002",
      tags: ["coffee", "beverages"],
      createdAt: "2024-11-15T00:00:00Z",
      updatedAt: "2024-12-10T00:00:00Z",
    },
    {
      id: "3",
      markName: "ZenData",
      description: "Data analytics and business intelligence software",
      jurisdiction: "EU",
      classes: ["42"],
      status: "registered",
      clientName: "ZenData Analytics Ltd",
      clientEmail: "legal@zendata.eu",
      filingDate: "2024-01-20",
      applicationNumber: "EU-2024-0003",
      registrationNumber: "EU-2024-0003-R",
      tags: ["software", "analytics"],
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-06-15T00:00:00Z",
    },
  ];

  private constructor() {}

  public static getInstance(): TrademarkService {
    if (!TrademarkService.instance) {
      TrademarkService.instance = new TrademarkService();
    }
    return TrademarkService.instance;
  }

  async getTrademarks(): Promise<Trademark[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData;
  }

  async getTrademarkById(id: string): Promise<Trademark | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockData.find(tm => tm.id === id) || null;
  }

  async createTrademark(data: Omit<Trademark, "id" | "createdAt" | "updatedAt">): Promise<Trademark> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTrademark: Trademark = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mockData.push(newTrademark);
    return newTrademark;
  }

  async updateTrademark(id: string, data: Partial<Trademark>): Promise<Trademark | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = this.mockData.findIndex(tm => tm.id === id);
    if (index === -1) return null;

    this.mockData[index] = {
      ...this.mockData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.mockData[index];
  }

  async deleteTrademark(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.mockData.findIndex(tm => tm.id === id);
    if (index === -1) return false;

    this.mockData.splice(index, 1);
    return true;
  }

  async searchTrademarks(query: string): Promise<Trademark[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lowercaseQuery = query.toLowerCase();
    return this.mockData.filter(trademark => 
      trademark.markName.toLowerCase().includes(lowercaseQuery) ||
      trademark.clientName.toLowerCase().includes(lowercaseQuery) ||
      trademark.description.toLowerCase().includes(lowercaseQuery) ||
      trademark.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}
