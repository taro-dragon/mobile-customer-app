import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type User = {
  id: string; // Firebase Auth UID
  familyName?: string;
  givenName?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  location?: FirebaseFirestoreTypes.GeoPoint; // 位置情報
  phoneNumber?: string;
  isAnonymous: boolean; // 匿名認証かどうか
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
