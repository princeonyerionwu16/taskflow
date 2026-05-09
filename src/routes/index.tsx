import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, BarChart3, CheckCircle2, Layers, Command } from "lucide-react";
import { FloatingOrbs } from "@/components/FloatingOrbs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaskFlow Pro — Organize Work Beautifully" },
      {
        name: "description",
        content:
          "A modern productivity workspace built for focus, speed, and clarity. Designed like Linear, fast as Raycast.",
      },
      { property: "og:title", content: "TaskFlow Pro — Organize Work Beautifully" },
      {
        property: "og:description",
        content: "Premium productivity dashboard for teams that ship.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Zap, title: "Fast as thought", desc: "Keyboard-first workflow with instant transitions and zero loading screens." },
  { icon: Layers, title: "Beautifully organized", desc: "Tags, priorities, categories — surface what matters, hide the rest." },
  { icon: BarChart3, title: "Insightful analytics", desc: "Track streaks, completion rates, and weekly productivity at a glance." },
  { icon: Command, title: "Built for focus", desc: "Cinematic dark interface engineered to disappear so the work shines." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs />

      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative">
            <div className="size-9 rounded-2xl bg-gradient-hero grid place-items-center shadow-elegant">
              <Zap className="size-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-hero blur-lg opacity-50 -z-10" />
          </div>
          <span className="font-semibold tracking-tight">TaskFlow <span className="text-muted-foreground">Pro</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <Link to="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
          <Link to="/tasks" className="hover:text-foreground transition-colors">Tasks</Link>
        </nav>
        <Link
          to="/auth"
          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          Open app <ArrowRight className="size-3.5" />
        </Link>
      </header>

      <section className="relative z-10 px-6 lg:px-12 pt-16 lg:pt-28 pb-20 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8"
        >
          <Sparkles className="size-3 text-primary" />
          New · Premium dark interface · v2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.95]"
        >
          Organize work
          <br />
          <span className="text-gradient">beautifully.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7 text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
        >
          A modern productivity workspace built for focus, speed, and clarity.
          Inspired by Linear, Notion, and Arc.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <Link
            to="/auth"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-hero text-white font-medium shadow-elegant hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-hero blur-xl opacity-50 -z-10 group-hover:opacity-80 transition-opacity" />
            Get started free
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium hover:bg-white/[0.06] transition-colors"
          >
            View demo
          </Link>
        </motion.div>

        {/* Hero preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 mx-auto max-w-5xl"
        >
          <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-30 -z-10" />
          <div className="glass rounded-3xl p-3 shadow-elegant">
            <div className="rounded-2xl bg-background/80 overflow-hidden border border-white/5">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                <div className="size-2.5 rounded-full bg-rose-400/60" />
                <div className="size-2.5 rounded-full bg-amber-400/60" />
                <div className="size-2.5 rounded-full bg-emerald-400/60" />
                <div className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">taskflow.app/dashboard</div>
              </div>
              <div className="grid grid-cols-12 gap-3 p-5 text-left">
                <div className="col-span-3 space-y-2">
                  {["Dashboard", "Tasks", "Analytics", "Settings"].map((l, i) => (
                    <div key={l} className={`px-3 py-2 rounded-lg text-xs ${i === 0 ? "bg-white/[0.06]" : "text-muted-foreground"}`}>{l}</div>
                  ))}
                </div>
                <div className="col-span-9 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {["Active", "Done", "Streak"].map((l, i) => (
                      <div key={l} className="glass rounded-xl p-3">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                        <div className="text-xl font-semibold tracking-tight mt-1">{[12, 87, 14][i]}{i === 1 ? "%" : ""}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-xl p-3 space-y-2">
                    {["Design new onboarding flow", "Review Q2 analytics", "Ship dark mode polish"].map((t) => (
                      <div key={t} className="flex items-center gap-2.5 py-1.5">
                        <div className="size-3.5 rounded border border-white/20" />
                        <span className="text-xs">{t}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground">Today</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="relative z-10 px-6 lg:px-12 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-primary font-medium mb-3">Features</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">Everything you need.<br /><span className="text-muted-foreground">Nothing you don't.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-7 shadow-elegant"
            >
              <div className="size-11 rounded-2xl bg-gradient-hero/20 grid place-items-center mb-5">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-4xl mx-auto text-center">
        <div className="glass rounded-3xl p-12 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="relative">
            <CheckCircle2 className="size-10 text-primary mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">Ready to focus?</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">Open the workspace and feel the difference in seconds.</p>
            <Link
              to="/auth"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-hero text-white font-medium shadow-elegant hover:scale-[1.02] transition-transform"
            >
              Launch dashboard <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 lg:px-12 py-10 text-center text-xs text-muted-foreground">
        Built with care · TaskFlow Pro · 2026
      </footer>
    </div>
  );
}
