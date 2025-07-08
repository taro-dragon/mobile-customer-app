import { Stock } from "../firestore_schema/stock";
import { Talk } from "../firestore_schema/talks";
import { User } from "../firestore_schema/users";
import { Car } from "../models/Car";
import { Staff } from "@/types/firestore_schema/staff";

export type TalkWithUser = Talk & {
  user: User;
  sourceCar?: Car;
  sourceStockCar?: Stock;
  staffs?: Map<string, Staff>;
};
