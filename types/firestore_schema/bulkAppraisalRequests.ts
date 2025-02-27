import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BulkAppraisalRequest = {
  id: string;
  userId: string; // 依頼ユーザー
  carId: string; // 査定対象の車
  status: "open" | "closed"; // 状態（オープン/クローズ）
  bidCount: number; // 入札数
  deadline: FirebaseFirestoreTypes.Timestamp; // 締切時間
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
