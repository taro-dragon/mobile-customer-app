import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Car = {
  id: string;
  userId: string;
  maker: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  grade: string;
  bodyType: string;
  condition: string;
  conditionScore: number;
  photoUrls: string[];
  aiAnalysisResults: {
    exterior: {
      scratches: boolean;
      dents: boolean;
      rust: boolean;
      paintCondition: string;
      // その他の外装状態
    };
    interior: {
      seatCondition: string;
      dashboardCondition: string;
      // その他の内装状態
    };
    // その他のAI分析結果
  };
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
