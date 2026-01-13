import { z } from "zod";

export const trademarkSchema = z.object({
  id: z.string().optional(),
  markName: z.string().min(1, "Mark name is required"),
  description: z.string().min(1, "Description is required"),
  jurisdiction: z.enum(["ET", "US", "EU", "UK", "CN", "JP"], {
    message: "Jurisdiction is required",
  }),
  classes: z.array(z.string()).min(1, "At least one class is required"),
  status: z.enum([
    "filing", 
    "office-action", 
    "publication", 
    "registered", 
    "opposition", 
    "abandoned"
  ]),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Valid email is required"),
  filingDate: z.string().optional(),
  applicationNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  priorityDate: z.string().optional(),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()),
});

export type TrademarkFormData = z.infer<typeof trademarkSchema>;
