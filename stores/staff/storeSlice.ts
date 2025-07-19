import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";

import { StoreSlice } from "@/types/slices/staff/storeSlice";
import { Shop } from "@/types/models/Shop";

export const createStoreSlice: StateCreator<StoreSlice, [], [], StoreSlice> = (
  set,
  get
) => ({
  stores: [],
  storeLoading: false,
  storesUnsubscribe: undefined,
  fetchStores: async (storeIds: string[]) => {
    const currentUnsubscribe = get().storesUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }

    set((state) => ({ ...state, storeLoading: true }));

    try {
      const stores = await Promise.all(
        storeIds.map(async (storeId) => {
          const shop = await firestore().collection("shops").doc(storeId).get();
          const shopData = shop.data() as Shop;
          shopData.id = shop.id;
          return shopData;
        })
      );
      set((state) => ({ ...state, stores: stores, storeLoading: false }));
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      set((state) => ({ ...state, storeLoading: false }));
      // エラー時はstoresを空配列にリセット
      set((state) => ({ ...state, stores: [] }));
    }
  },
  setStoreLoading: (storeLoading: boolean) => {
    set((state) => ({ ...state, storeLoading }));
  },
  clearStores: () => {
    const currentUnsubscribe = get().storesUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({
      ...state,
      stores: [],
      storeLoading: false,
      storesUnsubscribe: undefined,
    }));
  },
});
