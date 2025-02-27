import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type InventoryItem = {
  id: string;
  affiliateStoreId: string; // 所有加盟店
  maker: string; // メーカー
  model: string; // 車種
  year: number; // 年式
  mileage: number; // 走行距離
  color: string;
  fuelType: string; // 燃料タイプ
  transmission: string; // トランスミッション
  grade: string; // グレード
  bodyType: string; // ボディタイプ
  price: number; // 販売価格
  description: string; // 説明
  photoUrls: string[]; // 写真URL配列
  isAvailable: boolean; // 販売可能かどうか
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
