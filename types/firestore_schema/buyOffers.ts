import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BuyOffer = {
  id: string;
  affiliateStoreId: string; // 加盟店ID
  maker: string; // メーカー
  model: string; // 車種
  year: string;
  grade?: string;
  price: number; // 提示価格
  description: string; // 説明
  isActive: boolean; // 有効かどうか
  expiresAt: FirebaseFirestoreTypes.Timestamp; // 有効期限
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
