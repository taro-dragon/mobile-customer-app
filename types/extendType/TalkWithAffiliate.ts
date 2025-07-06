import { AffiliateStore } from "../firestore_schema/affiliateStores";
import { Stock } from "../firestore_schema/stock";
import { Talk } from "../firestore_schema/talks";
import { Car } from "../models/Car";

export type TalkWithAffiliate = Talk & {
  affiliateStore: AffiliateStore;
  sourceCar?: Car;
  sourceStockCar?: Stock;
};
