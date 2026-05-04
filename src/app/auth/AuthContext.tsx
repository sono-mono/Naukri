import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserRole = "WORKER" | "EMPLOYER";

export type SessionUser = {
  user_id: string;
  phone_number: string;
  role: UserRole | null;
  language_preference: "en" | "hi" | "mr";
};

type AuthSession = {
  token: string;
  user: SessionUser;
};

type AuthContextValue = {
  session: AuthSession | null;
  isReady: boolean;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

const STORAGE_KEY = "bluelink-auth-session";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSessionState(JSON.parse(raw) as AuthSession);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    isReady,
    setSession(nextSession) {
      setSessionState(nextSession);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    },
    clearSession() {
      setSessionState(null);
      localStorage.removeItem(STORAGE_KEY);
    },
  }), [isReady, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function routeForRole(role: UserRole | null): string {
  if (role === "WORKER") {
    return "/worker/profile";
  }
  if (role === "EMPLOYER") {
    return "/employer/profile";
  }
  return "/auth";
}
