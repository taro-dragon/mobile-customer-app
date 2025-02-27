import { AppState } from "@/types/slices/AppSlice";
import { StateCreator } from "zustand";

export const createAppSlice: StateCreator<AppState, [], [], AppState> = (
  set
) => ({
  isAuthLoading: true,
  isAppReady: false,

  setIsAuthLoading: (loading) => set({ isAuthLoading: loading }),
  setAppReady: (ready) => set({ isAppReady: ready }),
});
