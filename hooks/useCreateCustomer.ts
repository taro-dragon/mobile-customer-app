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
      const carRef = firestore().collection("cars").doc();
      const carId = carRef.id;
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
      const storeCarImageUrls = async (
        carId: string,
        imageUrls: { [key: string]: string }
      ) => {
        await firestore().collection("cars").doc(carId).set(
          {
            images: imageUrls,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      };
      const carData = {
        id: carId,
        ownerId: userId,
        maker,
        model,
        year,
        gread,
        createdAt: firestore.Timestamp.now(),
      };
      await firestore().collection("cars").doc(carId).set(carData);
      await storeCarImageUrls(carId, photos);
      const createCustomerData: Customer = {
        id: userId,
        isAnonymous: true,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      };
      await firestore()
        .collection("customers")
        .doc(userId)
        .set(createCustomerData);
      await firestore()
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
