import { Car } from "@/types/models/Car";
import { CarSlice } from "@/types/slices/CarSlice";
import { StateCreator } from "zustand";

export const createSlice: StateCreator<CarSlice, [], [], CarSlice> = (set) => ({
  cars: [],
  carLoading: false,
  setCars: (cars: Car[]) => set((state) => ({ ...state, cars })),
  editCar: (updatedCar: Car) =>
    set((state) => ({
      ...state,
      cars: { ...state.cars, ...updatedCar },
    })),
  deleteCar: () => set((state) => ({ ...state, cars: [] })),
  setCarLoading: (carLoading: boolean) =>
    set((state) => ({
      ...state,
      carLoading: carLoading,
    })),
});
