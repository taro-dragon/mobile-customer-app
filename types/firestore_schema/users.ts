import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type User = {
  id: string;
  familyName?: string;
  givenName?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  lat?: number;
  lng?: number;
  phoneNumber?: string;
  isAnonymous: boolean;
  expoPushToken?: string;
  pushSettings: {
    isMessage: boolean;
    isBid: boolean;
    isBulkStatusChange: boolean;
  };
  blockIdList: string[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
