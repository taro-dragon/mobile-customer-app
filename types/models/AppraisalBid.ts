import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Shop } from "./Shop";
import { BulkAppraisalStatus } from "@/constants/BulkAppraisalStatus";

export type AppraisalBid = {
  id: string;
  clientId: string;
  amount: number;
  comment: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  status: BulkAppraisalStatus;
  shop: Shop;
};
