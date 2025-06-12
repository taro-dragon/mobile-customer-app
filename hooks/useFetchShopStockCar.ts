import { Stock } from "@/types/firestore_schema/stock";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const fetchShopStockCar = async (
  shopId: string,
  lastDoc?: any
): Promise<{ data: Stock[]; lastDoc: any; hasMore: boolean }> => {
  let query = firestore()
    .collection("stockCars")
    .where("shopId", "==", shopId)
    .limit(PAGE_SIZE);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const stockCarSnapshot = await query.get();

  const data: Stock[] = stockCarSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Stock[];

  const lastDocument = stockCarSnapshot.docs[stockCarSnapshot.docs.length - 1];
  const hasMore = stockCarSnapshot.docs.length === PAGE_SIZE;

  return {
    data,
    lastDoc: lastDocument,
    hasMore,
  };
};

export const useFetchShopStockCar = (shopId: string) => {
  const { data, error, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        if (pageIndex === 0) return [`stockCars-${shopId}`, shopId, null];
        if (!previousPageData?.hasMore) return null;
        return [`stockCars-${shopId}`, shopId, previousPageData.lastDoc];
      },
      ([_, shopId, lastDoc]) => fetchShopStockCar(shopId, lastDoc),
      {
        revalidateFirstPage: false,
        revalidateAll: false,
      }
    );

  // データを平坦化
  const stockCars: Stock[] = data ? data.flatMap((page) => page.data) : [];
  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;

  // 次のページを読み込む関数
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
