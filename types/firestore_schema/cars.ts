import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Car = {
  id: string;
  userId: string; // 所有者
  maker: string; // メーカー
  model: string; // 車種
  year: number; // 年式
  mileage: number; // 走行距離
  color: string;
  fuelType: string; // 燃料タイプ
  transmission: string; // トランスミッション
  grade: string; // グレード
  bodyType: string; // ボディタイプ
  condition: string; // AI判定による状態
  conditionScore: number; // AI判定によるスコア（0-100）
  photoUrls: string[]; // 写真URL配列
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
