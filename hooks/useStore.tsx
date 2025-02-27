import { create } from "zustand";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { createAuthSlice } from "@/stores/authSlice";
import { createCarSlice } from "@/stores/carSlice";
import { CarSlice } from "@/types/slices/CarSlice";
import { AppState } from "@/types/slices/AppSlice";
import { createAppSlice } from "@/stores/appSlice";

export const useStore = create<AuthSlice & CarSlice & AppState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCarSlice(...a),
  ...createAppSlice(...a),
}));
