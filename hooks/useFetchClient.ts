import { Client } from "@/types/models/Client";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchClient = async (id: string) => {
  const snapshot = await firestore().collection("clients").doc(id).get();
  const clientData = snapshot.data();
  if (!clientData) {
    return undefined;
  }
  return {
    ...clientData,
    id: snapshot.id,
  };
};

const useClient = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `client-${id}` : null,
    () => fetchClient(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    client: data as Client | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useClient;
