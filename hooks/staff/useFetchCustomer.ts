import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { User } from "@/types/firestore_schema/users";

const fetchCustomer = async (id: string) => {
  try {
    const customerSnapshot = await firestore()
      .collection("users")
      .doc(id)
      .get();
    const customerData = customerSnapshot.data();
    if (!customerData) {
      return undefined;
    }
    return {
      ...customerData,
      id: customerSnapshot.id,
    };
  } catch (error) {
    console.error(error);
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "車両情報の取得に失敗しました",
    });
    return undefined;
  }
};

const useFetchCustomer = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `customer-${id}` : null,
    () => fetchCustomer(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    customer: data as User | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchCustomer;
