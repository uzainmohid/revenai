"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Auth {
  token: string | null;
  email: string | null;
  setAuth: (token: string, email: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<Auth>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      setAuth: (token, email) => set({ token, email }),
      clearAuth: () => set({ token: null, email: null }),
      isAuthenticated: () => Boolean(get().token),
    }),
    { name: "rv-auth" }
  )
);
