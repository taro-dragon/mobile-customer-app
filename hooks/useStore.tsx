import { create } from "zustand";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { createAuthSlice } from "@/stores/authSlice";

export const useStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}));
