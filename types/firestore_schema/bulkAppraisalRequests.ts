import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BulkAppraisalRequest = {
  id: string;
  userId: string;
  carId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  prefecture: string;
  modelNumber: string;
  mileage: number;
  repairStatus: string;
  sellTime: string;
  status?: "in_progress" | "waiting_selection" | "finished";
  deadline: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
