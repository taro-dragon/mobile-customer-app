import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";

import { Shop } from "@/types/models/Shop";
import { CurrentStoreSlice } from "@/types/slices/staff/currentStoreSlice";

export const createCurrentStoreSlice: StateCreator<
  CurrentStoreSlice,
  [],
  [],
  CurrentStoreSlice
> = (set, get) => ({
  currentStore: null,
  currentStoreLoading: false,
  unsubscribe: undefined,
  fetchCurrentStore: async (shopId: string) => {
    const currentUnsubscribe = get().unsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, currentStoreLoading: true }));
    try {
      const unsubscribe = await firestore()
        .collection("shops")
        .doc(shopId)
        .onSnapshot((snapshot) => {
          const storeData = snapshot.data() as Shop;
          storeData.id = snapshot.id;
          set((state) => ({
            ...state,
            currentStore: storeData,
            currentStoreLoading: false,
          }));
        });
      set((state) => ({ ...state, unsubscribe }));
    } catch (error) {
      set((state) => ({ ...state, currentStoreLoading: false }));
      return undefined;
    }
  },
  setCurrentStoreLoading: (currentStoreLoading: boolean) => {
    set((state) => ({ ...state, currentStoreLoading }));
  },
  clearCurrentStore: () => {
    set((state) => ({
      ...state,
      currentStore: null,
      currentStoreLoading: false,
    }));
  },
});
