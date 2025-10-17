import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  User,
  Phone,
  CreditCard,
  Loader2,
  Building2,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CreditReport } from "@shared/schema";
import { format } from "date-fns";

export default function ReportDetailsPage() {
  const [, params] = useRoute("/reports/:id");
  const reportId = params?.id;

  const { data: report, isLoading } = useQuery<CreditReport>({
    queryKey: ["/api/reports", reportId],
    enabled: !!reportId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-12 text-center">
          <h3 className="text-xl font-semibold">Report not found</h3>
          <p className="mt-2 text-muted-foreground">
            The requested credit report could not be found.
          </p>
          <Link href="/reports">
            <Button className="mt-6">Back to Reports</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 670) return "text-success";
    if (score >= 580) return "text-warning";
    return "text-destructive";
  };

  const getCreditScoreBg = (score: number) => {
    if (score >= 670) return "bg-success/10";
    if (score >= 580) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 670) return "Good";
    if (score >= 580) return "Fair";
    return "Poor";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/reports">
          <Button variant="ghost" size="sm" className="mb-4 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Button>
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="text-report-name">
              {report.basicDetails.name}
            </h1>
            <p className="text-muted-foreground">
              Report #{report.reportNumber} •{" "}
              {format(new Date(report.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-6 pb-3 border-b">
              Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Full Name</span>
                </div>
                <p className="text-base font-medium" data-testid="text-fullname">
                  {report.basicDetails.name}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Mobile Phone</span>
                </div>
                <p className="text-base font-medium font-mono" data-testid="text-phone">
                  {report.basicDetails.mobilePhone || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">PAN Number</span>
                </div>
                <p className="text-base font-medium font-mono" data-testid="text-pan">
                  {report.basicDetails.pan || "N/A"}
                </p>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${getCreditScoreBg(report.basicDetails.creditScore)}`}>
            <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Credit Score
            </h2>
            <div className="text-center">
              <div
                className={`text-5xl font-bold mb-2 ${getCreditScoreColor(
                  report.basicDetails.creditScore
                )}`}
                data-testid="text-credit-score"
              >
                {report.basicDetails.creditScore}
              </div>
              <Badge
                variant="outline"
                className={`${getCreditScoreColor(
                  report.basicDetails.creditScore
                )} border-current`}
              >
                {getCreditScoreLabel(report.basicDetails.creditScore)}
              </Badge>
              <p className="text-xs text-muted-foreground mt-3">
                Range: 300-850
              </p>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Report Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Total Accounts
              </p>
              <p className="text-2xl font-bold" data-testid="text-total-accounts">
                {report.reportSummary.totalAccounts}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Active Accounts
              </p>
              <p className="text-2xl font-bold text-success" data-testid="text-active-accounts">
                {report.reportSummary.activeAccounts}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Closed Accounts
              </p>
              <p className="text-2xl font-bold" data-testid="text-closed-accounts">
                {report.reportSummary.closedAccounts}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Recent Enquiries
              </p>
              <p className="text-2xl font-bold" data-testid="text-recent-enquiries">
                {report.reportSummary.recentEnquiries}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Current Balance
              </p>
              <p className="text-2xl font-bold" data-testid="text-current-balance">
                ₹{report.reportSummary.currentBalance.toLocaleString()}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Secured Amount
              </p>
              <p className="text-2xl font-bold text-success" data-testid="text-secured-amount">
                ₹{report.reportSummary.securedAmount.toLocaleString()}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Unsecured Amount
              </p>
              <p className="text-2xl font-bold text-warning" data-testid="text-unsecured-amount">
                ₹{report.reportSummary.unsecuredAmount.toLocaleString()}
              </p>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Credit Accounts</h2>
          {report.creditAccounts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No credit accounts found</p>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-card">
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Bank
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Account Number
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Current Balance
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Amount Overdue
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.creditAccounts.map((account, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-0 even:bg-card/50"
                        data-testid={`row-account-${index}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{account.bank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm" data-testid={`text-account-number-${index}`}>
                          {account.accountNumber}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {account.accountType}
                        </td>
                        <td className="px-6 py-4 font-semibold" data-testid={`text-balance-${index}`}>
                          ₹{account.currentBalance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              account.overdueAmount > 0
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                            data-testid={`text-overdue-${index}`}
                          >
                            ₹{account.overdueAmount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {account.status === "Active" || account.overdueAmount === 0 ? (
                            <div className="flex items-center gap-1.5 text-success">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-sm font-medium">Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Overdue</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {report.creditAccounts.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Account Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.creditAccounts
                  .filter((account) => account.address && account.address.trim())
                  .map((account, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm mb-1">
                            {account.bank} - {account.accountNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {account.address}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
