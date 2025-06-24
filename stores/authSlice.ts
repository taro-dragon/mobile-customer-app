import { Staff } from "@/types/firestore_schema/staff";
import { User } from "@/types/firestore_schema/users";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  staff: undefined,
  user: undefined,
  todo: [],
  isAuthLoading: false,
  setStaff: (staff: Staff) => set((state) => ({ ...state, staff })),
  editStaff: (updatedStaff: Staff) =>
    set((state) => ({
      ...state,
      staff: { ...state.staff, ...updatedStaff },
    })),
  deleteStaff: () => set((state) => ({ ...state, staff: undefined })),
  setUser: (user: User) => set((state) => ({ ...state, user })),
  editUser: (updatedUser: User) =>
    set((state) => ({
      ...state,
      user: { ...state.user, ...updatedUser },
    })),
  deleteUser: () => set((state) => ({ ...state, user: undefined })),
  setIsAuthLoading: (isAuthLoading: boolean) =>
    set((state) => ({
      ...state,
      isAuthLoading: isAuthLoading,
    })),
});
