import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Car = {
  id: string;
  ownerId: string;
  maker: string;
  model: string;
  year: number;
  photos: string[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
