import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type manufacturer = {
  country: string;
  manufacturerId: string;
  name: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type model = {
  group?: string;
  modelId: string;
  name: string;
  period?: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type year = {
  year: string;
  yearId: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type grade = {
  gradeId: string;
  gradeName: string;
  modelNumber: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
