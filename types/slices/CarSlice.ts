import { Car } from "../models/Car";

export type CarSlice = {
  cars: Car[];
  carLoading: boolean;
  setCars: (cars: Car[]) => void;
  editCar: (car: Car) => void;
  deleteCar: () => void;
  setCarLoading: (carLoading: boolean) => void;
};
