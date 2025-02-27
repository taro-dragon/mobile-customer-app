import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Staff = {
  id: string;
  userId: string; // Firebase Auth UID
  managementCompanyId: string | null; // 運営会社への参照（null の場合は加盟店に所属）
  affiliateStoreId: string | null; // 加盟店への参照（null の場合は運営会社に所属）
  name: string;
  position: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
