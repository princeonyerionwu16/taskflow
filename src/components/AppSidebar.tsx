import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, CheckSquare, BarChart3, Settings, Sparkles, Zap, LogOut } from "lucide-react";
import { useTaskStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const tasks = useTaskStore((s) => s.tasks);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const active = tasks.filter((t) => !t.completed).length;
  const done = tasks.filter((t) => t.completed).length;
  const rate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const name = profile?.display_name || user?.email?.split("@")[0] || "You";
  const initials = name.slice(0, 2).toUpperCase();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 p-5 sticky top-0 h-screen">
      <Link to="/" className="flex items-center gap-2.5 px-2">
        <div className="relative">
          <div className="size-9 rounded-2xl bg-gradient-hero grid place-items-center shadow-elegant">
            <Zap className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-hero blur-lg opacity-50 -z-10" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">TaskFlow</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Pro</div>
        </div>
      </Link>

      <div className="glass rounded-2xl p-3 flex items-center gap-2.5">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt={name} className="size-8 rounded-xl object-cover" />
        ) : (
          <div className="size-8 rounded-xl bg-gradient-hero grid place-items-center text-xs font-semibold">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{name}</div>
          <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
        </div>
        <button onClick={signOut} title="Sign out" className="text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="size-3.5" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const isActive = path === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-white/[0.06] text-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="size-4" />
              <span className="font-medium tracking-tight">{item.label}</span>
              {isActive && (
                <span className="ml-auto size-1.5 rounded-full bg-gradient-hero" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto glass rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-3.5" />
          Quick stats
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-lg font-semibold tracking-tight">{active}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">{rate}%</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Done</div>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-hero rounded-full transition-all duration-700"
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
