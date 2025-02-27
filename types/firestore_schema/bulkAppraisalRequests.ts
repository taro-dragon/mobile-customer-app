import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BulkAppraisalRequest = {
  id: string;
  userId: string;
  carId: string;
  status?: "in_progress" | "deadline" | "completed";
  deadline: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
