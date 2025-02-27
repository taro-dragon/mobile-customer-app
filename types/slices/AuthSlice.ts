import { User } from "@/types/firestore_schema/users";
import { Staff } from "@/types/firestore_schema/staff";

export interface AuthSlice {
  staff: Staff | undefined;
  user: User | undefined;
  isAuthLoading: boolean;
  setStaff: (staff: Staff) => void;
  editStaff: (staff: Staff) => void;
  deleteStaff: () => void;
  setUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: () => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
}
