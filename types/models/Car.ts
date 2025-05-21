import { BulkAppraisalStatus } from "@/constants/BulkAppraisalStatus";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Car = {
  id: string;
  ownerId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  modelNumber: string;
  condition?: string;
  images: {
    front: string;
    back: string;
    left: string;
    right: string;
  };
  mileage: number;
  repairStatus: string;
  sellTime: string;
  color: string;
  status?: BulkAppraisalStatus;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
