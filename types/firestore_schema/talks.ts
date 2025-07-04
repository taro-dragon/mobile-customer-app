import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Talk = {
  id: string;
  userId: string; // ユーザーID
  carId: string; // 車両ID
  affiliateStoreId: string; // 加盟店ID
  staffId: string | null; // 対応スタッフID
  sourceType: "buyOffer" | "bids" | "car_inquiry"; // チャットの発生源
  sourceId: string; // 発生源ID（買取オファーIDまたは一括査定依頼ID）
  status: "active" | "closed"; // チャットの状態
  lastMessage: string; // 最後のメッセージ
  isArchived: boolean; // チャットがアーカイブされているかどうか
  lastMessageAt: FirebaseFirestoreTypes.Timestamp; // 最後のメッセージ時間
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
