import { AffiliateStore } from "../firestore_schema/affiliateStores";
import { Talk } from "../firestore_schema/tolks";

export type TalkWithAffiliate = Talk & {
  affiliateStore: AffiliateStore;
};
