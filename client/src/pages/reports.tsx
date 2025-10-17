import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { FileText, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CreditReport } from "@shared/schema";
import { format } from "date-fns";

export default function ReportsPage() {
  const { data: reports, isLoading } = useQuery<CreditReport[]>({
    queryKey: ["/api/reports"],
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

  if (!reports || reports.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Credit Reports</h1>
          <p className="text-muted-foreground">
            View and analyze all uploaded credit reports
          </p>
        </div>

        <Card className="p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-6 text-xl font-semibold">No reports yet</h3>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
            Upload your first Experian XML file to start analyzing credit
            information
          </p>
          <Link href="/upload">
            <Button className="mt-6" data-testid="button-upload-first">
              Upload Report
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Credit Reports</h1>
        <p className="text-muted-foreground">
          {reports.length} {reports.length === 1 ? "report" : "reports"} available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`}>
            <Card className="p-6 hover-elevate transition-all cursor-pointer" data-testid={`card-report-${report.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${report.id}`}>
                    {report.basicDetails.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Report #{report.reportNumber}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Credit Score
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      report.basicDetails.creditScore >= 670
                        ? "text-success"
                        : report.basicDetails.creditScore >= 580
                        ? "text-warning"
                        : "text-destructive"
                    }`}
                    data-testid={`text-score-${report.id}`}
                  >
                    {report.basicDetails.creditScore}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
