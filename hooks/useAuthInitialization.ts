import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";
import { Customer } from "@/types/models/Customer";
import * as SplashScreen from "expo-splash-screen";
import { Client } from "@/types/models/Client";

export default function useAuthInitialization() {
  SplashScreen.preventAutoHideAsync();
  const { setCustomer, setClient, setIsAuthLoading, deleteCustomer } =
    useStore();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          user.providerData.forEach(async (provider) => {
            if (provider.providerId === "password") {
              await firestore()
                .collection("clients")
                .doc(user.uid)
                .onSnapshot((snapshot) => {
                  if (snapshot.exists) {
                    const client = snapshot.data() as Client;
                    client.id = user.uid;
                    setClient(client);
                  }
                });
            } else {
              await firestore()
                .collection("customers")
                .doc(user.uid)
                .onSnapshot((snapshot) => {
                  if (snapshot.exists) {
                    const customer = snapshot.data() as Customer;
                    customer.id = user.uid;
                    setCustomer(customer);
                  }
                });
            }
          });
          if (user.isAnonymous) {
            await firestore()
              .collection("customers")
              .doc(user.uid)
              .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                  const customer = snapshot.data() as Customer;
                  customer.id = user.uid;
                  setCustomer(customer);
                }
              });
          }
        } else {
          deleteCustomer();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAuthLoading(false);
        SplashScreen.hideAsync();
      }
    });

    return () => unsubscribe();
  }, []);
}
