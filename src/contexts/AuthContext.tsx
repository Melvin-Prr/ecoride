"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  pseudo: string;
  role: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, pseudo: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("ecoride_token");
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      } else {
        // Token invalid, clear it
        localStorage.removeItem("ecoride_token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("ecoride_token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur de connexion");
    }

    setToken(data.data.token);
    setUser(data.data.user);
    localStorage.setItem("ecoride_token", data.data.token);
  };

  const register = async (email: string, pseudo: string, password: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pseudo, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors) {
        // Validation errors
        const errorMessages = Object.values(data.errors).join(", ");
        throw new Error(errorMessages);
      }
      throw new Error(data.error || "Erreur lors de l'inscription");
    }

    setToken(data.data.token);
    setUser(data.data.user);
    localStorage.setItem("ecoride_token", data.data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ecoride_token");
  };

  const refreshUser = async () => {
    if (token) {
      await fetchCurrentUser(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
