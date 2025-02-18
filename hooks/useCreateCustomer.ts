import { useStore } from "@/hooks/useStore";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Customer } from "@/types/models/Customer";

const useCreateCustomer = () => {
  const { setCustomer } = useStore();
  const createCustomer = async () => {
    try {
      const user = await auth().signInAnonymously();
      const userId = user.user?.uid;
      if (!userId) {
        throw new Error("ユーザーIDが取得できませんでした");
      }
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
