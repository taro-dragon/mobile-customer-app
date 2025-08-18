import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Manufacturer = {
  country: string;
  manufacturerId: string;
  name: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Model = {
  group?: string;
  modelId: string;
  name: string;
  period?: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Year = {
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
