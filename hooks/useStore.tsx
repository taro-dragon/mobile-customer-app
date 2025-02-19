import { create } from "zustand";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { createAuthSlice } from "@/stores/authSlice";
import { createCarSlice } from "@/stores/carSlice";
import { CarSlice } from "@/types/slices/CarSlice";

export const useStore = create<AuthSlice & CarSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCarSlice(...a),
}));
