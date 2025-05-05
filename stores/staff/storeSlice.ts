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
  unsubscribe: undefined,
  fetchStores: async (shopIds: string[]) => {
    const currentUnsubscribe = get().unsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }

    set((state) => ({ ...state, storeLoading: true }));

    try {
      const stores = await Promise.all(
        shopIds.map(async (shopId) => {
          const shop = await firestore().collection("shops").doc(shopId).get();
          const shopData = shop.data() as Shop;
          shopData.id = shop.id;
          return shopData;
        })
      );
      set((state) => ({ ...state, stores: stores, storeLoading: false }));
    } catch (error) {
      console.error("Error setting up stores listener:", error);
      set((state) => ({ ...state, storeLoading: false }));
      return undefined;
    }
  },
  setStoreLoading: (storeLoading: boolean) => {
    set((state) => ({ ...state, storeLoading }));
  },
  clearStores: () => {
    set((state) => ({ ...state, stores: [], storeLoading: false }));
  },
});
