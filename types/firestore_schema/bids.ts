import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Bid = {
  id: string;
  bulkAppraisalRequestId: string; // 一括査定依頼ID
  affiliateStoreId: string; // 入札した加盟店
  price: number; // 提示価格
  comment: string; // コメント
  isSelected: boolean; // ユーザーに選択されたかどうか
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
