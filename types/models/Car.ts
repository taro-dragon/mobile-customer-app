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
    interior: string;
    other1?: string;
    other2?: string;
    other3?: string;
    other4?: string;
    other5?: string;
    other6?: string;
  };
  mileage: number;
  repairStatus: string;
  sellTime: string;
  color: string;
  firstRegistrationYear: string;
  status?: BulkAppraisalStatus;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  description?: string;
};
