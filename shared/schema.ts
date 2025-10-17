import { z } from "zod";

// Credit Report Schema
export const creditReportSchema = z.object({
  basicDetails: z.object({
    name: z.string(),
    mobilePhone: z.string(),
    pan: z.string(),
    creditScore: z.number(),
  }),
  reportSummary: z.object({
    totalAccounts: z.number(),
    activeAccounts: z.number(),
    closedAccounts: z.number(),
    currentBalance: z.number(),
    securedAmount: z.number(),
    unsecuredAmount: z.number(),
    recentEnquiries: z.number(),
  }),
  creditAccounts: z.array(
    z.object({
      bank: z.string(),
      accountNumber: z.string(),
      accountType: z.string(),
      address: z.string(),
      overdueAmount: z.number(),
      currentBalance: z.number(),
      creditLimit: z.number().optional(),
      status: z.string().optional(),
    })
  ),
  createdAt: z.string(),
  reportDate: z.string(),
  reportNumber: z.string(),
});

export const insertCreditReportSchema = creditReportSchema.omit({ 
  createdAt: true 
});

export type CreditReport = z.infer<typeof creditReportSchema> & { id: string };
export type InsertCreditReport = z.infer<typeof insertCreditReportSchema>;
