import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Staff } from "@/types/firestore_schema/staff";

const fetchStaffList = async (id: string) => {
  try {
    const staffListSnapshot = await firestore()
      .collection("staffs")
      .where("shops", "array-contains", id)
      .get();
    const staffList = staffListSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    }) as Staff[];
    return staffList;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "スタッフ情報の取得に失敗しました",
    });
    router.back();
  }
};

const useFetchStaffList = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `staffList-${id}` : null,
    () => fetchStaffList(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    staffList: data as Staff[] | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchStaffList;
