import { Model } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

type ModelWithId = Model & { id: string };

const fetchModels = async (manufacturerId: string): Promise<ModelWithId[]> => {
  try {
    const manufacturersSnapshot = await firestore()
      .collection("manufacturers")
      .doc(manufacturerId)
      .collection("models")
      .orderBy("name")
      .get();

    const manufacturers: ModelWithId[] = manufacturersSnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as ModelWithId[];

    return manufacturers;
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }
};

export const useFetchModels = ({
  manufacturerId,
}: {
  manufacturerId: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["models", manufacturerId],
    () => fetchModels(manufacturerId),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5 * 60 * 1000, // 5分間キャッシュ
    }
  );

  return {
    models: data || [],
    error,
    isLoading,
    mutate,
  };
};
