import { Car } from "../models/Car";

export type CarSlice = {
  cars: Car[];
  carLoading: boolean;
  fetchCars: (ownerId: string) => Promise<void>;
  deleteCar: () => void;
  setCarLoading: (carLoading: boolean) => void;
};
