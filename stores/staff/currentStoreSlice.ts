import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";

import { Shop } from "@/types/models/Shop";
import { CurrentStoreSlice } from "@/types/slices/staff/currentStoreSlice";
import { Staff } from "@/types/firestore_schema/staff";

export const createCurrentStoreSlice: StateCreator<
  CurrentStoreSlice,
  [],
  [],
  CurrentStoreSlice
> = (set, get) => ({
  currentStore: null,
  currentStoreStaffs: [],
  currentStoreLoading: false,
  currentStoreStaffsLoading: false,
  currentStoreUnsubscribe: undefined,
  currentStoreStaffsUnsubscribe: undefined,
  setCurrentStore: (store: Shop) => {
    set((state) => ({ ...state, currentStore: store }));
  },
  fetchCurrentStore: async (shopId: string) => {
    const currentUnsubscribe = get().currentStoreUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, currentStoreLoading: true }));
    try {
      const currentStoreUnsubscribe = await firestore()
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
      set((state) => ({ ...state, currentStoreUnsubscribe }));
    } catch (error) {
      set((state) => ({ ...state, currentStoreLoading: false }));
      return undefined;
    }
  },
  fetchCurrentStoreStaffs: async (shopId: string) => {
    const currentStoreStaffsUnsubscribe = get().currentStoreStaffsUnsubscribe;
    if (currentStoreStaffsUnsubscribe) {
      currentStoreStaffsUnsubscribe();
    }
    set((state) => ({ ...state, currentStoreStaffsLoading: true }));
    try {
      const currentStoreStaffsUnsubscribe = await firestore()
        .collection("staffs")
        .where("shops", "array-contains", shopId)
        .onSnapshot((snapshot) => {
          const staffs = snapshot.docs.map((doc) => {
            const staff = doc.data() as Staff;
            staff.id = doc.id;
            return staff;
          });
          set((state) => ({
            ...state,
            currentStoreStaffs: staffs,
            currentStoreStaffsLoading: false,
          }));
        });
      set((state) => ({ ...state, currentStoreStaffsUnsubscribe }));
    } catch (error) {
      set((state) => ({ ...state, currentStoreStaffsLoading: false }));
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
