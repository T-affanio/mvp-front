"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "./auth.service";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // reidratação
  useEffect(() => {
    const storedUser = localStorage.getItem("@user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const { token, admin } = await loginRequest(email, password);

    localStorage.setItem("@token", token);
    localStorage.setItem("@user", JSON.stringify(admin));
    document.cookie = `token=${token}; path=/; SameSite=Lax`;

    setUser(admin);
  }

  function logout() {
    localStorage.clear();
    document.cookie = "token=; Max-Age=0; path=/";
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
