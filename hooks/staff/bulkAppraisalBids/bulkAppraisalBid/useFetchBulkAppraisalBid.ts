import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import { ExBulkAppraisalBid } from "../type";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";
import { Bid } from "@/types/firestore_schema/bids";

const fetchBulkAppraisalBid = async (id: string) => {
  try {
    const bulkAppraisalBid = await firestore().collection("bids").doc(id).get();
    const bulkAppraisalBidData = bulkAppraisalBid.data() as Bid;
    const bulkAppraisalRequest = await firestore()
      .collection("bulkAppraisalRequests")
      .doc(bulkAppraisalBidData.bulkAppraisalRequestId)
      .get();
    const bulkAppraisalRequestData =
      bulkAppraisalRequest.data() as BulkAppraisalRequest;
    const car = await firestore()
      .collection("cars")
      .doc(bulkAppraisalBidData.carId)
      .get();
    const carData = car.data() as Car;

    return {
      ...bulkAppraisalBidData,
      id,
      car: carData,
      bulkAppraisalRequests: bulkAppraisalRequestData,
    } as ExBulkAppraisalBid;
  } catch (error) {
    throw error;
  }
};

export const useFetchBulkAppraisalBid = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bulkAppraisalBid-${id}` : null,
    () => (id ? fetchBulkAppraisalBid(id) : undefined),
    {
      revalidateOnFocus: true,
    }
  );
  return {
    data: data as ExBulkAppraisalBid,
    error,
    mutate,
    isLoading,
  };
};
