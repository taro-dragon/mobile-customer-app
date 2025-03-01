import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AppraisalBid } from "./AppraisalBid";

export type Appraisal = {
  id: string;
  status: "pending" | "active" | "completed" | "cancelled";
  carId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  prefecture: string;
  city: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  bids?: AppraisalBid[];
};
