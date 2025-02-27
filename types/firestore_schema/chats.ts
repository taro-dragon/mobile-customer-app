import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Chat = {
  id: string;
  userId: string; // ユーザーID
  affiliateStoreId: string; // 加盟店ID
  staffId: string | null; // 対応スタッフID
  sourceType: "buyOffer" | "bulkAppraisal"; // チャットの発生源
  sourceId: string; // 発生源ID（買取オファーIDまたは一括査定依頼ID）
  status: "active" | "closed"; // チャットの状態
  lastMessageAt: FirebaseFirestoreTypes.Timestamp; // 最後のメッセージ時間
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
