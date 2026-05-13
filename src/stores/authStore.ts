"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  walletAddress: string | null;
  setUser: (user: User | null) => void;
  setWallet: (address: string | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      walletAddress: null,

      setUser: (user) => set({ user }),
      setWallet: (walletAddress) => set({ walletAddress }),
      setLoading: (isLoading) => set({ isLoading }),

      signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ user: null, walletAddress: null });
      },

      refreshUser: async () => {
        const supabase = createClient();
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();
        if (!authUser) {
          set({ user: null, isLoading: false });
          return;
        }
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        set({ user: data ?? null, isLoading: false });
      },
    }),
    {
      name: "labvex-auth",
      partialize: (state) => ({
        walletAddress: state.walletAddress,
      }),
    }
  )
);
