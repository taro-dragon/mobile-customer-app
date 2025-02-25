import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Client } from "./Client";

export type AppraisalBid = {
  id: string;
  clientId: string;
  amount: number;
  comment: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  status: "pending" | "accepted" | "rejected";
  client: Client;
};
