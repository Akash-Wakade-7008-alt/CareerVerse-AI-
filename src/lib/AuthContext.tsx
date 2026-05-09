"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export interface AuthUser {
  userId: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ ok: false }),
  signup: async () => ({ ok: false }),
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from Supabase session on mount and listen for changes
  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            userId: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User",
          });
        }
      } catch (error) {
        console.error("Session fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    void initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          userId: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.name || "User",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      if (data.user) {
        return { ok: true };
      }
      return { ok: false, error: "Login failed" };
    } catch (err: any) {
      if (err.message?.includes("fetch")) {
        return { ok: false, error: "Connection error: Please check your .env.local file for correct Supabase URL and Keys." };
      }
      return { ok: false, error: err.message || "Network error. Please try again." };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      if (data.user) {
        return { ok: true };
      }
      return { ok: false, error: "Signup failed" };
    } catch (err: any) {
      if (err.message?.includes("fetch")) {
        return { ok: false, error: "Connection error: Please check your .env.local file for correct Supabase URL and Keys." };
      }
      return { ok: false, error: err.message || "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
