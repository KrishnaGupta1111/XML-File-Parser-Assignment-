import { Link, useLocation } from "wouter";
import { FileText, Upload } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">CreditSea</span>
        </div>

        <nav className="ml-8 hidden md:flex items-center gap-1">
          <Link href="/upload">
            <Button
              variant={location === "/upload" ? "secondary" : "ghost"}
              size="sm"
              className="gap-2"
              data-testid="link-upload"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link href="/reports">
            <Button
              variant={location === "/reports" || location.startsWith("/reports/") ? "secondary" : "ghost"}
              size="sm"
              className="gap-2"
              data-testid="link-reports"
            >
              <FileText className="h-4 w-4" />
              Reports
            </Button>
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="md:hidden border-t bg-card">
        <div className="container mx-auto flex px-4 py-2 gap-2">
          <Link href="/upload" className="flex-1">
            <Button
              variant={location === "/upload" ? "secondary" : "ghost"}
              size="sm"
              className="w-full gap-2"
              data-testid="link-upload-mobile"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link href="/reports" className="flex-1">
            <Button
              variant={location === "/reports" || location.startsWith("/reports/") ? "secondary" : "ghost"}
              size="sm"
              className="w-full gap-2"
              data-testid="link-reports-mobile"
            >
              <FileText className="h-4 w-4" />
              Reports
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
