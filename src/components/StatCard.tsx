import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  accent?: string;
  index?: number;
}

export function StatCard({ label, value, delta, icon: Icon, accent = "oklch(0.7 0.2 265)", index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative glass rounded-3xl p-5 shadow-elegant overflow-hidden"
    >
      <div
        className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
        style={{ background: accent }}
      />
      <div className="relative flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <div
          className="size-8 rounded-xl grid place-items-center"
          style={{ background: `color-mix(in oklab, ${accent} 20%, transparent)` }}
        >
          <Icon className="size-4" style={{ color: accent }} />
        </div>
      </div>
      <div className="relative flex items-end justify-between">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {delta && (
          <div className="text-xs text-emerald-300 font-medium">{delta}</div>
        )}
      </div>
    </motion.div>
  );
}
