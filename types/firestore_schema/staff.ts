import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Staff = {
  id: string;
  name: string;
  position: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  clientId: string;
  shops: string[];
  isOwner: boolean;
  isFirstLogin: boolean;
  password: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  expoPushToken: string;
};
