import { Shop } from "@/types/models/Shop";

export type StoreSlice = {
  stores: Shop[];
  storeLoading: boolean;
  storesUnsubscribe?: () => void;
  fetchStores: (storeIds: string[]) => void;
  setStoreLoading: (storeLoading: boolean) => void;
  clearStores: () => void;
};
