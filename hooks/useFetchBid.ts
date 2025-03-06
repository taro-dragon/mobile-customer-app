import { Bid } from "@/types/firestore_schema/bids";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import { ExtendedBid } from "./useFetchCarBids";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";

const fetchBid = async (id: string) => {
  if (!id) {
    return undefined;
  }
  const bidSnapshot = await firestore().collection("bids").doc(id).get();
  const bidData = bidSnapshot.data() as Bid;
  if (!bidData) {
    return undefined;
  }
  const affiliateStoreSnapshot = await firestore()
    .collection("shops")
    .doc(bidData.affiliateStoreId)
    .get();
  const affiliateStoreData = affiliateStoreSnapshot.data() as AffiliateStore;
  return {
    ...bidData,
    id: bidSnapshot.id,
    affiliateStore: affiliateStoreData,
  };
};

const useBid = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bid-${id}` : null,
    () => fetchBid(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    bid: data as ExtendedBid | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useBid;
