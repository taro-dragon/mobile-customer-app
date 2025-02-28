import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type ManagementCompany = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  logoUrl: string;
  antiqueDealerLicenseNumber: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
