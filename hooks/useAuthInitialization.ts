import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";
import { Customer } from "@/types/models/Customer";
import * as SplashScreen from "expo-splash-screen";

export default function useAuthInitialization() {
  SplashScreen.preventAutoHideAsync();
  const { setCustomer, setIsAuthLoading, deleteCustomer } = useStore();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        await firestore()
          .collection("customers")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const customer = doc.data() as Customer;
              setCustomer({
                id: doc.id,
                isAnonymous: customer.isAnonymous,
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt,
                info: customer.info,
              });
            }
          });
      } else {
        deleteCustomer();
      }
      setIsAuthLoading(false);
      SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);
}
