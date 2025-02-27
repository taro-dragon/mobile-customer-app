import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Review = {
  id: string;
  userId: string; // レビュー投稿者
  affiliateStoreId: string; // レビュー対象の加盟店
  sourceType: "buyOffer" | "bulkAppraisal"; // レビューの発生源
  sourceId: string; // 発生源ID
  rating: number; // 評価（1-5）
  comment: string; // コメント
  initialPrice: number; // 最初に提示された価格
  finalPrice: number; // 最終的な価格
  priceDeviation: number; // 価格乖離（finalPrice - initialPrice）
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
