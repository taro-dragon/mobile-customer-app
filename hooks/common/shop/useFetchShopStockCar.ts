import { Stock } from "@/types/firestore_schema/stock";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const fetchShopStockCar = async (
  shopId: string,
  lastDoc?: any
): Promise<{ data: Stock[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("stockCars")
      .where("storeId", "==", shopId)
      .orderBy("createdAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const stockCarSnapshot = await query.get();

    const data: Stock[] = stockCarSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Stock[];

    const lastDocument =
      stockCarSnapshot.docs[stockCarSnapshot.docs.length - 1];
    const hasMore = stockCarSnapshot.docs.length === PAGE_SIZE;

    return {
      data,
      lastDoc: lastDocument,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

export const useFetchShopStockCar = (shopId: string) => {
  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        const key =
          pageIndex === 0
            ? [`stockCars-${shopId}`, shopId, null]
            : !previousPageData?.hasMore
            ? null
            : [`stockCars-${shopId}`, shopId, previousPageData.lastDoc];

        return key;
      },
      ([_, shopId, lastDoc]) => {
        return fetchShopStockCar(shopId, lastDoc);
      },
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
  };
};
