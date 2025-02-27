import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AffiliateStore = {
  id: string;
  managementCompanyId: string; // 運営会社への参照
  name: string;
  address: string;
  location: FirebaseFirestoreTypes.GeoPoint; // 位置情報
  phoneNumber: string;
  email: string;
  website: string;
  businessHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  logoUrl: string;
  coverImageUrl: string;
  averagePriceDeviation: number; // 平均乖離金額
  rating: number; // 評価平均
  reviewCount: number; // レビュー数
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
