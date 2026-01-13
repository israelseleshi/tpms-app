export interface Trademark {
  mark: string;
  class: string;
  jurisdiction: string;
  status: string;
  appNo: string;
}

export const trademarks: Trademark[] = [
  { mark: "Abyssinia Bank", class: "36", jurisdiction: "ET", status: "Filing", appNo: "ET/2025/0142" },
  { mark: "Blue Nile Coffee", class: "30", jurisdiction: "ET", status: "Office Action", appNo: "ET/2025/0098" },
  { mark: "LumenPay", class: "42", jurisdiction: "US", status: "Publication", appNo: "US/1844229" },
  { mark: "ZenData", class: "42", jurisdiction: "EU", status: "Registered", appNo: "EU/998122" },
];

export interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
  trademarks: number;
}

export const mockClients: Client[] = [
  {
    id: 1,
    name: "XYZ Consult",
    contact: "John Doe",
    email: "john@xyzconsult.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    trademarks: 12,
  },
  {
    id: 2,
    name: "TechCorp International",
    contact: "Jane Smith",
    email: "jane@techcorp.com",
    phone: "+1 (555) 987-6543",
    country: "Canada",
    trademarks: 8,
  },
  {
    id: 3,
    name: "Global Brands LLC",
    contact: "Mike Johnson",
    email: "mike@globalbrands.com",
    phone: "+1 (555) 456-7890",
    country: "United Kingdom",
    trademarks: 15,
  },
];
