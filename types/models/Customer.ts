import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Customer = {
  id: string;
  isAnonymous: boolean;
  info?: {
    familyName: string;
    givenName: string;
    familyNameKana: string;
    givenNameKana: string;
    postalCode: string;
    address: string;
    phone: string;
    profileImage: string;
  };
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
