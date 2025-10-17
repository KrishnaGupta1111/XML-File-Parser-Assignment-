import mongoose from "mongoose";

const creditAccountSchema = new mongoose.Schema({
  bank: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, required: true },
  address: { type: String, default: "" },
  overdueAmount: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  creditLimit: { type: Number },
  status: { type: String },
});

const creditReportSchema = new mongoose.Schema({
  basicDetails: {
    name: { type: String, required: true },
    mobilePhone: { type: String, default: "" },
    pan: { type: String, default: "" },
    creditScore: { type: Number, required: true },
  },
  reportSummary: {
    totalAccounts: { type: Number, default: 0 },
    activeAccounts: { type: Number, default: 0 },
    closedAccounts: { type: Number, default: 0 },
    currentBalance: { type: Number, default: 0 },
    securedAmount: { type: Number, default: 0 },
    unsecuredAmount: { type: Number, default: 0 },
    recentEnquiries: { type: Number, default: 0 },
  },
  creditAccounts: [creditAccountSchema],
  createdAt: { type: Date, default: Date.now },
  reportDate: { type: String, required: true },
  reportNumber: { type: String, required: true },
});

export const CreditReport = mongoose.model("CreditReport", creditReportSchema);
