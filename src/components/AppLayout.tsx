import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { FloatingOrbs } from "./FloatingOrbs";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <FloatingOrbs />
        <Loader2 className="size-6 animate-spin text-muted-foreground relative z-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <FloatingOrbs />
      <AppSidebar />
      <main className="flex-1 min-w-0 flex flex-col px-5 lg:px-10 py-8 max-w-[1400px] mx-auto w-full">
        <div className="flex-1">{children}</div>
        <footer className="mt-10 rounded-3xl border border-border/60 bg-muted/70 p-6 text-sm text-muted-foreground shadow-sm backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-base font-semibold text-foreground">TaskFlow Pro</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Designed to help teams stay focused, move faster, and keep every priority visible. Your workspace for planning, tracking, and completing work with clarity.
              </p>
              <div className="mt-5 space-y-2 text-xs text-muted-foreground sm:flex sm:items-center sm:gap-4 sm:space-y-0">
                <span>Built for modern teams</span>
                <span aria-hidden="true">•</span>
                <span>Secure auth &amp; realtime-ready</span>
                <span aria-hidden="true">•</span>
                <span>Performance-first experience</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-foreground">Quick links</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</a>
                  </li>
                  <li>
                    <a href="/tasks" className="transition-colors hover:text-foreground">Tasks</a>
                  </li>
                  <li>
                    <a href="/analytics" className="transition-colors hover:text-foreground">Analytics</a>
                  </li>
                  <li>
                    <a href="/settings" className="transition-colors hover:text-foreground">Settings</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Need help?</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>support@taskflowpro.com</li>
                  <li>Documentation</li>
                  <li>Privacy</li>
                  <li>Terms</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-border/50 pt-4 text-xs text-muted-foreground sm:flex sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} TaskFlow Pro. All rights reserved.</span>
            <span>Made for focus-driven workflows.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
