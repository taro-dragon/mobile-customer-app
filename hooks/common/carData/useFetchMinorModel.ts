import { MinorModel } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchMinorModel = async (
  manufacturerId: string,
  modelId: string,
  generationId: string
): Promise<MinorModel[]> => {
  try {
    const minorModelsSnapshot = await firestore()
      .collection("manufacturers")
      .doc(manufacturerId)
      .collection("models")
      .doc(modelId)
      .collection("generations")
      .doc(generationId)
      .collection("minorChanges")
      .get();

    return minorModelsSnapshot.docs.map((doc) => doc.data() as MinorModel);
  } catch (error) {
    throw error;
  }
};

export const useFetchMinorModel = ({
  manufacturerId,
  modelId,
  generationId,
}: {
  manufacturerId: string;
  modelId: string;
  generationId: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["minorModels", manufacturerId, modelId, generationId],
    () => fetchMinorModel(manufacturerId, modelId, generationId),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    minorModels: data || [],
    error,
    isLoading,
    mutate,
  };
};
