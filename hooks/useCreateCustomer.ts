import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import { useStore } from "@/hooks/useStore";
import { Customer } from "@/types/models/Customer";
import { useFormContext } from "react-hook-form";
import { CarForm } from "@/types/models/CarForm";

const useCreateCustomer = () => {
  const { setCustomer } = useStore();
  const { watch } = useFormContext<CarForm>();
  const { front, back, left, right, maker, model, year, gread } = watch();

  const createCustomer = async () => {
    try {
      const user = await auth().signInAnonymously();
      const userId = user.user?.uid;
      if (!userId) {
        throw new Error("ユーザーIDが取得できませんでした");
      }

      const carDocRef = firestore().collection("cars").doc();
      const carId = carDocRef.id;

      const uploadImages = async (): Promise<{ [key: string]: string }> => {
        const images: { [key: string]: string | null } = {
          front,
          back,
          left,
          right,
        };

        const downloadURLs: { [key: string]: string } = {};
        for (const [key, image] of Object.entries(images)) {
          if (image) {
            const imageRef = storage().ref().child(`cars/${carId}/${key}.jpg`);
            await imageRef.putFile(image);
            const downloadURL = await imageRef.getDownloadURL();
            downloadURLs[key] = downloadURL;
          }
        }
        return downloadURLs;
      };

      const photos = await uploadImages();

      const carData = {
        id: carId,
        ownerId: userId,
        maker,
        model,
        year,
        gread,
        images: photos,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      const createCustomerData: Customer = {
        id: userId,
        isAnonymous: true,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      };

      await firestore().runTransaction(async (transaction) => {
        transaction.set(carDocRef, carData);

        const customerDocRef = firestore().collection("customers").doc(userId);
        transaction.set(customerDocRef, createCustomerData);
      });

      firestore()
        .collection("customers")
        .doc(userId)
        .onSnapshot((snapshot) => {
          const customer = snapshot.data() as Customer;
          setCustomer(customer);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return { createCustomer };
};

export default useCreateCustomer;
