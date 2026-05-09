import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — TaskFlow Pro" },
      { name: "description", content: "Sign in or create your TaskFlow Pro account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const oauth = async (provider: "google" | "apple") => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) {
      toast.error("Sign in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen grid place-items-center px-4 overflow-hidden">
      <FloatingOrbs />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="size-10 rounded-2xl bg-gradient-hero grid place-items-center shadow-elegant">
            <Zap className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight text-lg">TaskFlow Pro</span>
        </Link>

        <div className="glass rounded-3xl p-7 shadow-elegant">
          <h1 className="text-2xl font-semibold tracking-tighter">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            {mode === "signin" ? "Sign in to continue to your workspace." : "Start organizing in seconds."}
          </p>

          <div className="mt-6 grid gap-2">
            <Button type="button" variant="outline" disabled={loading} onClick={() => oauth("google")}>
              <svg className="size-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.6 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.7 3.94 14.6 3 12 3 6.98 3 2.9 7.04 2.9 12s4.08 9 9.1 9c5.25 0 8.73-3.69 8.73-8.88 0-.6-.07-1.05-.15-1.52z"/></svg>
              Continue with Google
            </Button>
            <Button type="button" variant="outline" disabled={loading} onClick={() => oauth("apple")}>
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.43 2.22-1.16 3.04-.79.9-2.06 1.6-3.13 1.5-.13-1.1.4-2.25 1.13-3.05.81-.9 2.18-1.57 3.16-1.49zM20 17.36c-.55 1.27-.81 1.83-1.52 2.95-.99 1.55-2.39 3.49-4.13 3.5-1.55.02-1.95-1-4.05-.99-2.1.01-2.54 1.01-4.09.99-1.74-.02-3.07-1.77-4.06-3.32C-.6 15.43-.91 8.92 2.55 6.42c1.23-.89 2.61-1.37 3.96-1.37 1.38 0 2.24.75 3.96.75 1.66 0 2.67-.75 4.27-.75 1.21 0 2.5.66 3.42 1.79-3.01 1.65-2.52 5.95.84 6.52z"/></svg>
              Continue with Apple
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <Input
                type="text"
                placeholder="Display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 pl-9"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="password"
                required
                minLength={6}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pl-9"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-hero">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <>
                {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="size-4" />
              </>}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-5">
            {mode === "signin" ? "New to TaskFlow?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-foreground font-medium hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
