import { Grade } from "@/types/firestore_schema/manufacturers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchGrades = async (
  manufacturerId: string,
  modelId: string,
  generationId: string,
  minorModelId: string
): Promise<Grade[]> => {
  try {
    const gradesSnapshot = await firestore()
      .collection("manufacturers")
      .doc(manufacturerId)
      .collection("models")
      .doc(modelId)
      .collection("generations")
      .doc(generationId)
      .collection("minorChanges")
      .doc(minorModelId)
      .collection("grades")
      .get();

    return gradesSnapshot.docs.map((doc) => doc.data() as Grade);
  } catch (error) {
    throw error;
  }
};

export const useFetchGrades = ({
  manufacturerId,
  modelId,
  generationId,
  minorModelId,
}: {
  manufacturerId: string;
  modelId: string;
  generationId: string;
  minorModelId: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["grades", manufacturerId, modelId, generationId, minorModelId],
    () => fetchGrades(manufacturerId, modelId, generationId, minorModelId),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    grades: data || [],
    error,
    isLoading,
    mutate,
  };
};
