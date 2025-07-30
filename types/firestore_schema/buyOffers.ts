import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BuyOffer = {
  id: string;
  affiliateStoreId: string; // 加盟店ID
  maker: string; // メーカー
  model: string; // 車種
  year: string;
  grade?: string;
  minPrice: number; // 最低価格
  maxPrice: number; // 最高価格
  description: string; // 説明
  isActive: boolean; // 有効かどうか
  contactUsers: string[]; // 連絡先ユーザーID
  status: "published" | "archived"; // 公開状態
  expiresAt: FirebaseFirestoreTypes.Timestamp; // 有効期限
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
