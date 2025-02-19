import { Car } from "@/types/models/Car";
import { CarSlice } from "@/types/slices/CarSlice";
import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";
export const createCarSlice: StateCreator<CarSlice, [], [], CarSlice> = (
  set
) => ({
  cars: [],
  carLoading: false,
  setCars: (cars: Car[]) => set((state) => ({ ...state, cars })),
  fetchCars: async (ownerId: string) => {
    try {
      set((state) => ({ ...state, carLoading: true }));
      const cars = await firestore()
        .collection("cars")
        .where("ownerId", "==", ownerId)
        .get();
      set((state) => ({
        ...state,
        cars: cars.docs.map((doc) => doc.data() as Car),
        carLoading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteCar: () => set((state) => ({ ...state, cars: [] })),
  setCarLoading: (carLoading: boolean) =>
    set((state) => ({
      ...state,
      carLoading: carLoading,
    })),
});
