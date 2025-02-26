import { Car } from "@/types/models/Car";
import { CarSlice } from "@/types/slices/CarSlice";
import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";
export const createCarSlice: StateCreator<CarSlice, [], [], CarSlice> = (
  set,
  get
) => ({
  cars: [],
  carLoading: false,
  unsubscribe: undefined,
  setCars: (cars: Car[]) => set((state) => ({ ...state, cars })),
  fetchCars: (ownerId: string) => {
    if (get().unsubscribe) {
      get().unsubscribe!();
    }
    set((state) => ({ ...state, carLoading: true }));
    const unsubscribe = firestore()
      .collection("cars")
      .where("ownerId", "==", ownerId)
      .onSnapshot(
        (snapshot) => {
          set((state) => ({
            ...state,
            cars: snapshot.docs.map((doc) => doc.data() as Car),
            carLoading: false,
          }));
        },
        (error) => {
          console.error(error);
          set((state) => ({ ...state, carLoading: false }));
        }
      );
    set((state) => ({ ...state, unsubscribe }));
    return unsubscribe;
  },
  deleteCar: () => set((state) => ({ ...state, cars: [] })),
  setCarLoading: (carLoading: boolean) =>
    set((state) => ({
      ...state,
      carLoading: carLoading,
    })),
});
