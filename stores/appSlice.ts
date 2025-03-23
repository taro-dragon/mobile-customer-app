import { AppSlice } from "@/types/slices/AppSlice";
import { StateCreator } from "zustand";

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set
) => ({
  isAuthLoading: true,
  isAppReady: false,

  setIsAuthLoading: (loading: boolean) => set({ isAuthLoading: loading }),
  setAppReady: (ready: boolean) => set({ isAppReady: ready }),
});
