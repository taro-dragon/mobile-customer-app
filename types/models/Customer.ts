import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Customer = {
  id: string;
  isAnonymous: boolean;
  info?: {
    familyName: string;
    givenName: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    phone: string;
    lat: number;
    lng: number;
  };
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
