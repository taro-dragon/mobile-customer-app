import { useStore } from "@/hooks/useStore";
import { Project } from "@/types/firestore_schema/project";
import { Stock } from "@/types/firestore_schema/stock";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const fetchArchivedStockCars = async (
  storeId: string,
  lastDoc?: any
): Promise<{ data: Stock[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("stockCars")
      .where("status", "==", "archived")
      .where("storeId", "==", storeId)
      .orderBy("updatedAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const data: Stock[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Stock;
      })
    );
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    const hasMore = snapshot.docs.length === PAGE_SIZE;
    return {
      data,
      lastDoc: lastDocument,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

const useArchivedStockCars = () => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, size, setSize, isValidating, isLoading, mutate } =
    useSWRInfinite(
      (pageIndex: number, previousPageData: any) => {
        if (!storeId) return null;
        const key =
          pageIndex === 0
            ? [`archivedStockCars-${storeId}`, storeId, null]
            : !previousPageData?.hasMore
            ? null
            : [
                `archivedStockCars-${storeId}`,
                storeId,
                previousPageData.lastDoc,
              ];
        return key;
      },
      ([_, storeId, lastDoc]: [string, string, any]) =>
        fetchArchivedStockCars(storeId, lastDoc),
      {
        revalidateFirstPage: false,
        revalidateAll: false,
        revalidateOnMount: true,
        revalidateOnFocus: false,
      }
    );

  const stockCars: Stock[] = data ? data.flatMap((page) => page.data) : [];
  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;

  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    stockCars,
    error,
    isLoading,
    isValidating,
    hasMore,
    loadMore,
    mutate,
  };
};

export default useArchivedStockCars;
