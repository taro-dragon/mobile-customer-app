import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Shop } from "./Shop";

export type AppraisalBid = {
  id: string;
  clientId: string;
  amount: number;
  comment: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  status: "pending" | "accepted" | "rejected";
  shop: Shop;
};
