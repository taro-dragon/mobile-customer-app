import { AffiliateStore } from "../firestore_schema/affiliateStores";
import { Talk } from "../firestore_schema/talks";
import { Car } from "../models/Car";

export type TalkWithAffiliate = Talk & {
  affiliateStore: AffiliateStore;
  car: Car;
};
