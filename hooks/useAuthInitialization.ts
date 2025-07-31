import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";
import { Staff } from "@/types/firestore_schema/staff";
import { User } from "@/types/firestore_schema/users";

const useAuthInitialization = () => {
  const { setStaff, setUser, deleteUser, setAppReady } = useStore();

  useEffect(() => {
    let isFirstAuthCheck = true;
    let hasSetAppReady = false;

    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // 認証済みユーザーの場合
          const userDataPromises: Promise<void>[] = [];

          user.providerData.forEach(async (provider) => {
            if (provider.providerId === "password") {
              // スタッフの場合
              const staffPromise = new Promise<void>((resolve) => {
                firestore()
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
                    resolve();
                  });
              });
              userDataPromises.push(staffPromise);
            } else {
              // 一般ユーザーの場合
              const userPromise = new Promise<void>((resolve) => {
                firestore()
                  .collection("users")
                  .doc(user.uid)
                  .onSnapshot((snapshot) => {
                    if (snapshot.exists()) {
                      const firebaseUser = snapshot.data() as User;
                      firebaseUser.id = user.uid;
                      firebaseUser.isAnonymous = false;
                      setUser(firebaseUser);
                    }
                    resolve();
                  });
              });
              userDataPromises.push(userPromise);
            }
          });

          if (user.isAnonymous) {
            // 匿名ユーザーの場合
            const anonymousUserPromise = new Promise<void>((resolve) => {
              firestore()
                .collection("users")
                .doc(user.uid)
                .onSnapshot((snapshot) => {
                  if (snapshot.exists()) {
                    const firebaseUser = snapshot.data() as User;
                    firebaseUser.id = user.uid;
                    setUser(firebaseUser);
                  }
                  resolve();
                });
            });
            userDataPromises.push(anonymousUserPromise);
          }

          // すべてのユーザーデータの取得が完了するまで待つ
          await Promise.all(userDataPromises);
        } else {
          // 未認証の場合
          deleteUser();
        }
      } catch (error) {
        console.error(error);
      } finally {
        // 初回の認証チェックが完了した場合のみisAppReadyをtrueにする
        if (isFirstAuthCheck && !hasSetAppReady) {
          hasSetAppReady = true;
          setAppReady(true);
        }
        isFirstAuthCheck = false;
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthInitialization;
