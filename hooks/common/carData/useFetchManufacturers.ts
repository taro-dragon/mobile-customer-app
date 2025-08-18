import { Manufacturer } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

type ManufacturerWithId = Manufacturer & { id: string };

const fetchManufacturers = async (): Promise<ManufacturerWithId[]> => {
  try {
    const manufacturersSnapshot = await firestore()
      .collection("manufacturers")
      .orderBy("name")
      .get();

    const manufacturers: ManufacturerWithId[] = manufacturersSnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as ManufacturerWithId[];

    return manufacturers;
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }
};

export const useFetchManufacturers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "manufacturers",
    fetchManufacturers,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5 * 60 * 1000, // 5分間キャッシュ
    }
  );

  return {
    manufacturers: data || [],
    error,
    isLoading,
    mutate,
  };
};
