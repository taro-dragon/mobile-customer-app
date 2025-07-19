import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";
import { Staff } from "@/types/firestore_schema/staff";
import { User } from "@/types/firestore_schema/users";

const useAuthInitialization = () => {
  const { setStaff, setUser, deleteUser, setAppReady } = useStore();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          user.providerData.map(async (provider) => {
            if (provider.providerId === "password") {
              await firestore()
                .collection("staffs")
                .doc(user.uid)
                .onSnapshot(async (snapshot) => {
                  if (snapshot.exists()) {
                    const staff = snapshot.data() as Staff;
                    staff.id = user.uid;
                    try {
                      const privateDataSnapshot = await firestore()
                        .collection("staffs")
                        .doc(user.uid)
                        .collection("privateData")
                        .doc(user.uid)
                        .get();
                      if (privateDataSnapshot.exists()) {
                        const privateData = privateDataSnapshot.data();
                        Object.assign(staff, privateData);
                      }
                    } catch (error) {
                      console.error("Error fetching privateData:", error);
                    }
                    setStaff(staff);
                  }
                });
            } else {
              await firestore()
                .collection("users")
                .doc(user.uid)
                .onSnapshot((snapshot) => {
                  if (snapshot.exists()) {
                    const firebaseUser = snapshot.data() as User;
                    firebaseUser.id = user.uid;
                    firebaseUser.isAnonymous = false;
                    setUser(firebaseUser);
                  }
                });
            }
          });

          if (user.isAnonymous) {
            await firestore()
              .collection("users")
              .doc(user.uid)
              .onSnapshot((snapshot) => {
                if (snapshot.exists()) {
                  const firebaseUser = snapshot.data() as User;
                  firebaseUser.id = user.uid;
                  setUser(firebaseUser);
                }
              });
          }
        } else {
          deleteUser();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAppReady(true);
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthInitialization;
