import { motion } from "framer-motion";
import { Check, Calendar, Trash2, Flag } from "lucide-react";
import { Task, useTaskStore, Priority } from "@/lib/store";

const priorityStyles: Record<Priority, { dot: string; label: string; ring: string }> = {
  urgent: { dot: "bg-rose-400", label: "text-rose-300", ring: "ring-rose-400/30" },
  high: { dot: "bg-orange-400", label: "text-orange-300", ring: "ring-orange-400/30" },
  medium: { dot: "bg-cyan-400", label: "text-cyan-300", ring: "ring-cyan-400/30" },
  low: { dot: "bg-emerald-400", label: "text-emerald-300", ring: "ring-emerald-400/30" },
};

function formatDue(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  const now = new Date();
  const diff = (d.getTime() - now.getTime()) / 86400000;
  if (diff < 0) return "Overdue";
  if (diff < 1) return "Today";
  if (diff < 2) return "Tomorrow";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function TaskCard({ task, index = 0 }: { task: Task; index?: number }) {
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const p = priorityStyles[task.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group glass rounded-2xl p-4 hover:bg-white/[0.05] transition-colors shadow-elegant"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          className={`mt-0.5 size-5 rounded-lg border transition-all grid place-items-center shrink-0 ${
            task.completed
              ? "bg-gradient-hero border-transparent"
              : "border-white/20 hover:border-white/40"
          }`}
          aria-label="Toggle task"
        >
          {task.completed && <Check className="size-3.5 text-white" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm font-medium tracking-tight transition-all ${
                task.completed ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {task.title}
            </h3>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-rose-400"
              aria-label="Delete"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ring-1 ${p.label} ${p.ring}`}
            >
              <span className={`size-1.5 rounded-full ${p.dot}`} />
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="size-3" />
                {formatDue(task.dueDate)}
              </span>
            )}

            {task.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-white/5"
              >
                #{t}
              </span>
            ))}

            <span className="ml-auto text-[10px] text-muted-foreground capitalize inline-flex items-center gap-1">
              <Flag className="size-3" />
              {task.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
