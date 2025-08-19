import { Generation } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchGenerations = async (
  manufacturerId: string,
  modelId: string
): Promise<Generation[]> => {
  try {
    const generationsSnapshot = await firestore()
      .collection("manufacturers")
      .doc(manufacturerId)
      .collection("models")
      .doc(modelId)
      .collection("generations")
      .get();

    return generationsSnapshot.docs.map((doc) => doc.data() as Generation);
  } catch (error) {
    throw error;
  }
};

export const useFetchGenerations = ({
  manufacturerId,
  modelId,
}: {
  manufacturerId: string;
  modelId: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["generations", manufacturerId, modelId],
    () => fetchGenerations(manufacturerId, modelId),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    generations: data || [],
    error,
    isLoading,
    mutate,
  };
};
