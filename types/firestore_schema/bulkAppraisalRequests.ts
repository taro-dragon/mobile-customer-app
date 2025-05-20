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
  status?: "in_progress" | "deadline" | "completed";
  deadline: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
