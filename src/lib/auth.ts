export interface AuthUser {
  email: string;
  username: string;
  password: string;
  initials: string;
  avatarUrl?: string | null;
}

export interface AuthSession {
  email: string;
  username: string;
  initials: string;
  avatarUrl?: string | null;
  demo?: boolean;
}

const USERS_KEY = "taskflow-users";
const SESSION_KEY = "taskflow-current-user";

const isBrowser = typeof window !== "undefined";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getLocalUsers(): AuthUser[] {
  if (!isBrowser) return [];
  return safeParse<AuthUser[]>(window.localStorage.getItem(USERS_KEY)) ?? [];
}

function setLocalUsers(users: AuthUser[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user: AuthSession | null) {
  if (!isBrowser) return;
  if (user) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

function createInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email.trim());
}

export function getCurrentUser(): AuthSession | null {
  if (!isBrowser) return null;
  return safeParse<AuthSession>(window.localStorage.getItem(SESSION_KEY));
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function logout() {
  setSession(null);
}

export function register(email: string, password: string, username?: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  const users = getLocalUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("This email is already registered.");
  }

  const normalizedUsername = username?.trim() || normalizedEmail.split("@")[0];
  const initials = createInitials(normalizedUsername || normalizedEmail);
  const user = {
    email: normalizedEmail,
    username: normalizedUsername,
    password,
    initials,
    avatarUrl: null,
  };

  users.push(user);
  setLocalUsers(users);

  const session: AuthSession = {
    email: user.email,
    username: user.username,
    initials: user.initials,
    avatarUrl: user.avatarUrl,
  };
  setSession(session);

  return session;
}

export function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  const users = getLocalUsers();
  if (users.length === 0) {
    const username = normalizedEmail.split("@")[0];
    const session: AuthSession = {
      email: normalizedEmail,
      username,
      initials: createInitials(username),
      avatarUrl: null,
      demo: true,
    };
    setSession(session);
    return session;
  }

  const user = users.find((item) => item.email === normalizedEmail);
  if (!user) {
    throw new Error("No account found for that email. Please register first.");
  }
  if (user.password !== password) {
    throw new Error("Password does not match. Please try again.");
  }

  const session: AuthSession = {
    email: user.email,
    username: user.username,
    initials: user.initials,
    avatarUrl: user.avatarUrl,
  };
  setSession(session);
  return session;
}

export function updateProfile(updates: { username?: string; avatarUrl?: string | null }) {
  const current = getCurrentUser();
  if (!current) return null;

  const username = updates.username?.trim() || current.username;
  const avatarUrl = updates.avatarUrl === undefined ? current.avatarUrl ?? null : updates.avatarUrl;
  const initials = createInitials(username || current.email);

  const users = getLocalUsers();
  const userIndex = users.findIndex((item) => item.email === current.email);
  if (userIndex >= 0) {
    users[userIndex] = {
      ...users[userIndex],
      username,
      initials,
      avatarUrl,
    };
    setLocalUsers(users);
  }

  const session: AuthSession = {
    email: current.email,
    username,
    initials,
    avatarUrl,
    demo: current.demo,
  };
  setSession(session);
  return session;
}
