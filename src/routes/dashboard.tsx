import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle2, Flame, ListTodo, Bell, Calendar as CalendarIcon } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { AddTask } from "@/components/AddTask";
import { TaskCard } from "@/components/TaskCard";
import { useTaskStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — TaskFlow Pro" },
      { name: "description", content: "Your productivity workspace at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const { user, profile } = useAuth();
  const name = profile?.display_name || user?.email?.split("@")[0] || "there";
  const active = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);
  const rate = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;
  const score = Math.min(100, done.length * 12 + active.length * 2);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <AppLayout>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between mb-10 flex-wrap gap-4"
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{today}</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mt-1">
            {greeting}, <span className="text-gradient">{name}</span>
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            You have <span className="text-foreground font-medium">{active.length}</span> active tasks today.
          </p>
        </div>
        <button className="size-10 rounded-2xl glass grid place-items-center hover:bg-white/[0.06] transition-colors">
          <Bell className="size-4" />
        </button>
      </motion.header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active tasks" value={active.length} icon={ListTodo} index={0} accent="oklch(0.72 0.2 240)" />
        <StatCard label="Completed" value={done.length} delta="+12%" icon={CheckCircle2} index={1} accent="oklch(0.7 0.2 265)" />
        <StatCard label="Completion rate" value={`${rate}%`} icon={Activity} index={2} accent="oklch(0.82 0.15 200)" />
        <StatCard label="Productivity" value={score} delta="+8 today" icon={Flame} index={3} accent="oklch(0.65 0.25 295)" />
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <AddTask />

          <div className="flex items-center justify-between mt-2">
            <h2 className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Active</h2>
            <span className="text-xs text-muted-foreground">{active.length} tasks</span>
          </div>
          <div className="space-y-2.5">
            <AnimatePresence>
              {active.map((t, i) => (
                <TaskCard key={t.id} task={t} index={i} />
              ))}
            </AnimatePresence>
            {active.length === 0 && (
              <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
                ✨ All clear. Time for a break.
              </div>
            )}
          </div>

          {done.length > 0 && (
            <>
              <div className="flex items-center justify-between mt-6">
                <h2 className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Completed</h2>
                <span className="text-xs text-muted-foreground">{done.length} tasks</span>
              </div>
              <div className="space-y-2.5">
                <AnimatePresence>
                  {done.map((t, i) => (
                    <TaskCard key={t.id} task={t} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-5 shadow-elegant"
          >
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="size-4 text-primary" />
              <h3 className="text-sm font-medium tracking-tight">This week</h3>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - d.getDay() + i);
                const isToday = d.toDateString() === new Date().toDateString();
                const intensity = Math.random() * 0.6 + 0.1;
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="text-[10px] text-muted-foreground uppercase">{["S","M","T","W","T","F","S"][i]}</div>
                    <div
                      className={`size-9 rounded-xl grid place-items-center text-xs font-medium transition-all ${isToday ? "bg-gradient-hero text-white shadow-elegant" : "bg-white/5"}`}
                      style={!isToday ? { background: `oklch(0.7 0.2 265 / ${intensity})` } : undefined}
                    >
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-5 shadow-elegant"
          >
            <h3 className="text-sm font-medium tracking-tight mb-4">Activity</h3>
            <div className="space-y-3">
              {[
                { user: "You", action: "completed", target: "Sync with engineering", time: "2h ago" },
                { user: "Mira", action: "commented on", target: "Onboarding flow", time: "4h ago" },
                { user: "You", action: "created", target: "Q2 analytics review", time: "yesterday" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="size-7 rounded-full bg-gradient-hero/30 grid place-items-center text-[10px] font-semibold shrink-0">
                    {a.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-muted-foreground">
                      <span className="text-foreground font-medium">{a.user}</span> {a.action}{" "}
                      <span className="text-foreground">{a.target}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-5 shadow-elegant relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-10" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-primary mb-2">AI insight</div>
              <p className="text-sm leading-relaxed">
                You complete <span className="font-medium">38% more</span> tasks before noon.
                Schedule deep work early.
              </p>
            </div>
          </motion.div>
        </aside>
      </div>
    </AppLayout>
  );
}
