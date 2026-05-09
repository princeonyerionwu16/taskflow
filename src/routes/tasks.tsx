import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { AddTask } from "@/components/AddTask";
import { TaskCard } from "@/components/TaskCard";
import { useTaskStore, Priority } from "@/lib/store";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — TaskFlow Pro" },
      { name: "description", content: "Manage every task with priorities, tags, and categories." },
    ],
  }),
  component: TasksPage,
});

const filters = ["all", "active", "completed"] as const;
const priorities: (Priority | "all")[] = ["all", "urgent", "high", "medium", "low"];

function TasksPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [priority, setPriority] = useState<(typeof priorities)[number]>("all");

  const filtered = tasks.filter((t) => {
    if (filter === "active" && t.completed) return false;
    if (filter === "completed" && !t.completed) return false;
    if (priority !== "all" && t.priority !== priority) return false;
    return true;
  });

  return (
    <AppLayout>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">Tasks</h1>
        <p className="text-sm text-muted-foreground mt-1.5">{filtered.length} of {tasks.length} tasks shown</p>
      </motion.header>

      <div className="space-y-5 mb-6">
        <AddTask />
        <div className="flex flex-wrap items-center gap-2">
          <div className="glass rounded-full p-1 flex">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${filter === f ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="glass rounded-full p-1 flex">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${priority === p ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence>
          {filtered.map((t, i) => (
            <TaskCard key={t.id} task={t} index={i} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center text-sm text-muted-foreground">
            No tasks match your filters.
          </div>
        )}
      </div>
    </AppLayout>
  );
}
