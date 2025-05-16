import useSWR from "swr";
import { useStore } from "../useStore";
import firestore from "@react-native-firebase/firestore";

export interface StockDraft {
  id?: string;
  storeId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  createdAt: any;
  updatedAt: any;
  createStaff?: string;
  [key: string]: any;
}

const fetchStockDrafts = async (storeId: string) => {
  const stockDrafts = await firestore()
    .collection("shops")
    .doc(storeId)
    .collection("stockDrafts")
    .get();
  return stockDrafts.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as StockDraft[];
};

const useFetchStockDrafts = () => {
  const { currentStore } = useStore();
  const { data, error, mutate, isLoading } = useSWR(
    currentStore?.id ? `stockDrafts-${currentStore.id}` : null,
    currentStore?.id ? () => fetchStockDrafts(currentStore.id) : null,
    {
      revalidateOnFocus: true,
    }
  );
  return {
    data: data as StockDraft[],
    error,
    mutate,
    isLoading,
  };
};

export default useFetchStockDrafts;
