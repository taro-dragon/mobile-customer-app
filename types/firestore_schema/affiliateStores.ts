import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AffiliateStore = {
  id: string;
  managementCompanyId: string; // 運営会社への参照
  shopName: string;
  address1: string;
  address2: string;
  address3: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  email: string;
  website: string;
  businessHours?: string;
  holiday?: string;
  imageUrls: string[];
  logoUrl: string;
  coverImageUrl: string;
  shopCatchCopy: string;
  description: string;
  averagePriceDeviation: number; // 平均乖離金額
  rating: number; // 評価平均
  reviewCount: number; // レビュー数
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
