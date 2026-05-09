import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { useTaskStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — TaskFlow Pro" },
      { name: "description", content: "Customize your workspace and preferences." },
    ],
  }),
  component: Settings,
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-gradient-hero" : "bg-white/10"}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow ${on ? "right-0.5" : "left-0.5"}`}
      />
    </button>
  );
}

function Settings() {
  const tasks = useTaskStore((s) => s.tasks);
  const { user, profile, setProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [compact, setCompact] = useState(false);
  const [shortcuts, setShortcuts] = useState(true);

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDisplayName(profile?.display_name || "");
    setAvatarUrl(profile?.avatar_url || "");
  }, [profile]);

  const initials = (displayName || user?.email || "U").slice(0, 2).toUpperCase();

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, avatar_url: avatarUrl || null })
      .eq("id", user.id)
      .select("id, display_name, avatar_url")
      .single();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setProfile(data as typeof profile);
    toast.success("Profile updated");
  };

  const items = [
    { label: "Notifications", desc: "Reminders for due tasks", on: notifications, set: setNotifications },
    { label: "Sound effects", desc: "Subtle audio feedback", on: sounds, set: setSounds },
    { label: "Compact mode", desc: "Tighter spacing everywhere", on: compact, set: setCompact },
    { label: "Keyboard shortcuts", desc: "Press ⌘K to open quick actions", on: shortcuts, set: setShortcuts },
  ];

  return (
    <AppLayout>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Make TaskFlow yours.</p>
      </motion.header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass rounded-3xl p-6 shadow-elegant h-fit space-y-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="size-16 rounded-2xl object-cover shadow-elegant" />
          ) : (
            <div className="size-16 rounded-2xl bg-gradient-hero grid place-items-center text-xl font-semibold shadow-elegant">
              {initials}
            </div>
          )}
          <div>
            <div className="text-base font-medium tracking-tight">{displayName || "Unnamed"}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs text-muted-foreground">Display name</label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <label className="text-xs text-muted-foreground">Avatar URL</label>
            <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" />
            <Button onClick={saveProfile} disabled={saving} className="w-full bg-gradient-hero">
              {saving ? "Saving…" : "Save profile"}
            </Button>
          </div>

          <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
            <div>
              <div className="text-lg font-semibold tracking-tight">{tasks.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Tasks</div>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">14d</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Streak</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass rounded-3xl p-2 shadow-elegant">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-colors"
            >
              <div>
                <div className="text-sm font-medium tracking-tight">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <Toggle on={item.on} onChange={item.set} />
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-3 glass rounded-3xl p-6 shadow-elegant">
          <h3 className="text-sm font-medium tracking-tight mb-4">Accent theme</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Indigo", color: "oklch(0.7 0.2 265)" },
              { name: "Violet", color: "oklch(0.65 0.25 295)" },
              { name: "Cyan", color: "oklch(0.82 0.15 200)" },
              { name: "Electric", color: "oklch(0.72 0.2 240)" },
              { name: "Emerald", color: "oklch(0.7 0.18 160)" },
            ].map((t, i) => (
              <button
                key={t.name}
                className="group glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div
                  className="size-10 rounded-xl shadow-elegant"
                  style={{ background: t.color, boxShadow: `0 0 30px -5px ${t.color}` }}
                />
                <div className="text-xs">{t.name}</div>
                {i === 0 && <div className="text-[9px] text-primary uppercase tracking-wider">Active</div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
