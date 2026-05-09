import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "low" | "medium" | "high" | "urgent";
export type Category = "work" | "personal" | "design" | "research" | "meeting";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "createdAt" | "completed">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  reorder: (ids: string[]) => void;
}

const seed: Task[] = [
  {
    id: "1",
    title: "Design new onboarding flow",
    description: "Sketch wireframes and prepare component variants",
    completed: false,
    priority: "high",
    category: "design",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    tags: ["ux", "v2"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Review Q2 analytics report",
    completed: false,
    priority: "medium",
    category: "work",
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    tags: ["analytics"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Sync with engineering team",
    completed: true,
    priority: "low",
    category: "meeting",
    tags: ["weekly"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Ship dark mode improvements",
    description: "Polish glass surfaces and animation timing",
    completed: false,
    priority: "urgent",
    category: "work",
    dueDate: new Date(Date.now() + 3600000 * 5).toISOString(),
    tags: ["frontend"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Read research on focus techniques",
    completed: true,
    priority: "low",
    category: "research",
    tags: ["learning"],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: seed,
      addTask: (t) =>
        set((s) => ({
          tasks: [
            {
              ...t,
              id: crypto.randomUUID(),
              completed: false,
              createdAt: new Date().toISOString(),
            },
            ...s.tasks,
          ],
        })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: !t.completed ? new Date().toISOString() : undefined,
                }
              : t,
          ),
        })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      updateTask: (id, patch) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      reorder: (ids) =>
        set((s) => ({
          tasks: ids.map((id) => s.tasks.find((t) => t.id === id)!).filter(Boolean),
        })),
    }),
    { name: "taskflow-pro" },
  ),
);
