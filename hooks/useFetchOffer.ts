import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

const fetchOffer = async (id: string) => {
  if (!id) {
    return undefined;
  }
  const offerSnapshot = await firestore().collection("buyOffers").doc(id).get();
  const offerData = offerSnapshot.data();
  if (!offerData) {
    return undefined;
  }
  return {
    ...offerData,
    id: offerSnapshot.id,
  };
};

const useOffer = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `offer-${id}` : null,
    () => fetchOffer(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    offer: data as BuyOffer | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useOffer;
