import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Staff = {
  id: string;
  familyName: string;
  givenName: string;
  familyNameKana: string;
  givenNameKana: string;
  profileImageUrl?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
