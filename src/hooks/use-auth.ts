import { useEffect, useState } from "react";
import { getCurrentUser, updateProfile, AuthSession } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const setProfile = (profile: AuthSession) => {
    const updated = updateProfile({ username: profile.username, avatarUrl: profile.avatarUrl ?? null });
    setUser(updated);
  };

  return { user, profile: user, setProfile, loading };
}
