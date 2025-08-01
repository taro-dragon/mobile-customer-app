import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Bid = {
  id: string;
  carId: string; // 車両ID
  bulkAppraisalRequestId: string; // 一括査定依頼ID
  affiliateStoreId: string; // 入札した加盟店
  minPrice: number; // 提示価格
  maxPrice: number; // 提示価格
  comment: string; // コメント
  isSelected: boolean; // ユーザーに選択されたかどうか
  staffId: string; // 入札社
  managerStaffIds: string[]; // 担当者
  status: "in_progress" | "waiting_selection" | "finished";
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
