import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { useTaskStore, Priority, Category } from "@/lib/store";

export function AddTask() {
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("work");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), priority, category, tags: [] });
    setTitle("");
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-2 flex items-center gap-2 shadow-elegant"
    >
      <div className="size-9 rounded-xl bg-gradient-hero/20 grid place-items-center shrink-0">
        <Sparkles className="size-4 text-primary" />
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground py-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="hidden md:block bg-white/5 rounded-lg text-xs px-2 py-1.5 outline-none border border-white/5"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="hidden md:block bg-white/5 rounded-lg text-xs px-2 py-1.5 outline-none border border-white/5"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="design">Design</option>
        <option value="research">Research</option>
        <option value="meeting">Meeting</option>
      </select>
      <button
        type="submit"
        className="size-9 rounded-xl bg-gradient-hero grid place-items-center hover:scale-105 active:scale-95 transition-transform shadow-elegant"
        aria-label="Add task"
      >
        <Plus className="size-4 text-white" strokeWidth={2.5} />
      </button>
    </motion.form>
  );
}
