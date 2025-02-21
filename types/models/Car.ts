import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Car = {
  id: string;
  ownerId: string;
  maker: string;
  model: string;
  year: string;
  gread: string;
  condition?: string;
  images: {
    front: string;
    back: string;
    left: string;
    right: string;
  };
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
