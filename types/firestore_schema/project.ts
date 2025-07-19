import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Project = {
  id: string;
  userId: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  status: "in_progress" | "completed";
  targetId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  modelNumber: string;
  type: "buy_offer" | "bids" | "car_inquiry";
  shopId: string;
  targetCarId: string;
  managerStaffs: string[];
  preferredInfo?: {
    preferredDates: {
      datetime: {
        seconds: number;
        nanoseconds: number;
      };
      priority: number;
    }[];
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    comment: string;
  };
  checkCurrentCarStatus?: {
    isAnswered: boolean;
    senderId: string;
    atSended: FirebaseFirestoreTypes.Timestamp;
  };
  appraisal?: {
    appraisalPrice: number;
    appraisalPriceNote: string;
    expiryDate: FirebaseFirestoreTypes.Timestamp;
  };
};
