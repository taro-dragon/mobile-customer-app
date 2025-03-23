import { Car } from "../models/Car";

export type CarSlice = {
  cars: Car[];
  carLoading: boolean;
  unsubscribe?: () => void;
  fetchCars: (ownerId: string) => void;
  setCarLoading: (carLoading: boolean) => void;
  clearCars: () => void;
};
