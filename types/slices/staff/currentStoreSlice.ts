import { Shop } from "@/types/models/Shop";

export type CurrentStoreSlice = {
  currentStore: Shop | null;
  currentStoreLoading: boolean;
  unsubscribe?: () => void;
  fetchCurrentStore: (storeId: string) => void;
  setCurrentStoreLoading: (currentStoreLoading: boolean) => void;
  clearCurrentStore: () => void;
};
