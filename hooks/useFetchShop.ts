import { Client } from "@/types/models/Client";
import { Shop } from "@/types/models/Shop";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchShop = async (id: string) => {
  const shopSnapshot = await firestore().collection("shops").doc(id).get();
  const shopData = shopSnapshot.data();
  if (!shopData) {
    return undefined;
  }
  const clientSnapshot = await firestore()
    .collection("clients")
    .doc(shopData.clientId)
    .get();
  const clientData = clientSnapshot.data();
  return {
    ...shopData,
    id: shopSnapshot.id,
    client: clientData,
  };
};

const useShop = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `shop-${id}` : null,
    () => fetchShop(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    shop: data as Shop | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useShop;
