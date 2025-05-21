import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AppraisalBid } from "./AppraisalBid";
import { BulkAppraisalStatus } from "@/constants/BulkAppraisalStatus";

export type Appraisal = {
  id: string;
  status: BulkAppraisalStatus;
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
