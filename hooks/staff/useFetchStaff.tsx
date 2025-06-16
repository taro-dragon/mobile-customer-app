import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Staff } from "@/types/firestore_schema/staff";

const fetchStaff = async (id: string) => {
  try {
    const staffSnapshot = await firestore().collection("staffs").doc(id).get();
    const staffData = staffSnapshot.data();
    if (!staffData) {
      throw new Error("スタッフ情報が見つかりません");
    }
    return {
      ...staffData,
      id: staffSnapshot.id,
    };
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "スタッフ情報の取得に失敗しました",
    });
    router.back();
    return undefined;
  }
};

const useFetchStaff = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `staff-${id}` : null,
    () => fetchStaff(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    staff: data as Staff | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchStaff;
