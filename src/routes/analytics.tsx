import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Flame, Target } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { useTaskStore } from "@/lib/store";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — TaskFlow Pro" },
      { name: "description", content: "Track productivity, completion rates, and weekly trends." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const tasks = useTaskStore((s) => s.tasks);
  const done = tasks.filter((t) => t.completed).length;
  const rate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  // 7-day mock trend
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
      value: Math.floor(Math.random() * 80) + 20,
    };
  });
  const max = Math.max(...days.map((d) => d.value));

  // Category breakdown
  const cats = ["work", "personal", "design", "research", "meeting"] as const;
  const catCounts = cats.map((c) => ({
    name: c,
    count: tasks.filter((t) => t.category === c).length,
  }));
  const catMax = Math.max(...catCounts.map((c) => c.count), 1);

  return (
    <AppLayout>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Your productivity in motion.</p>
      </motion.header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total tasks" value={tasks.length} icon={Target} index={0} accent="oklch(0.72 0.2 240)" />
        <StatCard label="Completed" value={done} icon={CheckCircle2} index={1} accent="oklch(0.7 0.2 265)" />
        <StatCard label="Completion" value={`${rate}%`} icon={Activity} index={2} accent="oklch(0.82 0.15 200)" />
        <StatCard label="Streak" value="14d" delta="best yet" icon={Flame} index={3} accent="oklch(0.65 0.25 295)" />
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-3xl p-7 shadow-elegant"
        >
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h3 className="text-base font-medium tracking-tight">Weekly productivity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Tasks completed per day</p>
            </div>
            <div className="text-2xl font-semibold tracking-tight text-gradient">+24%</div>
          </div>
          <div className="flex items-end justify-between h-56 gap-3">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary relative group cursor-pointer"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-card px-1.5 py-0.5 rounded">
                      {d.value}
                    </div>
                  </motion.div>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-7 shadow-elegant"
        >
          <h3 className="text-base font-medium tracking-tight mb-1">By category</h3>
          <p className="text-xs text-muted-foreground mb-6">Where your focus goes</p>
          <div className="space-y-4">
            {catCounts.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="capitalize">{c.name}</span>
                  <span className="text-muted-foreground">{c.count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.count / catMax) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
                    className="h-full rounded-full bg-gradient-hero"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
