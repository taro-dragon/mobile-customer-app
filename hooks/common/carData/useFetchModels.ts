import { Model } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

type ModelWithId = Model & { id: string };
export type ModelWithGenerations = ModelWithId & { hasGenerations: boolean };

const fetchModels = async (
  manufacturerId: string
): Promise<ModelWithGenerations[]> => {
  try {
    const manufacturersSnapshot = await firestore()
      .collection("manufacturers")
      .doc(manufacturerId)
      .collection("models")
      .orderBy("name")
      .get();

    const modelsWithGenerations: ModelWithGenerations[] = await Promise.all(
      manufacturersSnapshot.docs.map(async (doc) => {
        const generationsSnapshot = await firestore()
          .collection("manufacturers")
          .doc(manufacturerId)
          .collection("models")
          .doc(doc.id)
          .collection("generations")
          .limit(1)
          .get();

        return {
          id: doc.id,
          ...doc.data(),
          hasGenerations: !generationsSnapshot.empty,
        } as ModelWithGenerations;
      })
    );

    return modelsWithGenerations;
  } catch (error) {
    console.error("Error fetching models:", error);
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
