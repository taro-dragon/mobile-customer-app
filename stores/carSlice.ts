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
  fetchCars: async (ownerId: string) => {
    const currentUnsubscribe = get().unsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }

    set((state) => ({ ...state, carLoading: true }));

    try {
      const unsubscribe = await firestore()
        .collection("cars")
        .where("ownerId", "==", ownerId)
        .onSnapshot(
          (snapshot) => {
            const cars = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              } as Car;
            });
            console.log("cars", cars);
            set((state) => ({
              ...state,
              cars: cars,
              carLoading: false,
            }));
          },
          (error) => {
            console.error("Error fetching cars:", error);
            set((state) => ({ ...state, carLoading: false }));
          }
        );

      set((state) => ({ ...state, unsubscribe }));
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up cars listener:", error);
      set((state) => ({ ...state, carLoading: false }));
      return undefined;
    }
  },
  setCarLoading: (carLoading: boolean) =>
    set((state) => ({
      ...state,
      carLoading: carLoading,
    })),
});
