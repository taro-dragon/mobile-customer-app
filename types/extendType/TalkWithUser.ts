import { Talk } from "../firestore_schema/talks";
import { User } from "../firestore_schema/users";
import { Car } from "../models/Car";

export type TalkWithAffiliate = Talk & {
  user: User;
  car: Car;
};
