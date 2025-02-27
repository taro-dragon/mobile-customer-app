import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BuyOffer = {
  id: string;
  affiliateStoreId: string; // 加盟店ID
  maker: string; // メーカー
  model: string; // 車種
  yearMin: number; // 最小年式
  yearMax: number; // 最大年式
  mileageMax: number; // 最大走行距離
  price: number; // 提示価格
  conditions: string[]; // 条件（グレードや色など）
  description: string; // 説明
  isActive: boolean; // 有効かどうか
  expiresAt: FirebaseFirestoreTypes.Timestamp; // 有効期限
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
