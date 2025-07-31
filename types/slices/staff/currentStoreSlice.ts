import { Staff } from "@/types/firestore_schema/staff";
import { Shop } from "@/types/models/Shop";

export type CurrentStoreSlice = {
  currentStore: Shop | null;
  currentStoreStaffs: Staff[];
  currentStoreLoading: boolean;
  currentStoreStaffsLoading: boolean;
  currentStoreUnsubscribe?: () => void;
  setCurrentStore: (store: Shop) => void;
  currentStoreStaffsUnsubscribe?: () => void;
  fetchCurrentStore: (storeId: string) => void;
  fetchCurrentStoreStaffs: (storeId: string) => void;
  setCurrentStoreLoading: (currentStoreLoading: boolean) => void;
  clearCurrentStore: () => void;
};
