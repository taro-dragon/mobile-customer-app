import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Car } from "@/types/models/Car";
import { CarBuyOffer } from "../useFetchCarOffer";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";

const PAGE_SIZE = 10;

const fetchBuyOffersPage = async (
  car: Car,
  pageIndex: number,
  previousPageData: any
) => {
  if (!car) return [];
  let query = firestore()
    .collection("buyOffers")
    .where("maker", "==", car.maker)
    .where("model", "==", car.model)
    .where("year", "==", car.year)
    .where("grade", "==", car.grade)
    .where("modelNumber", "==", car.modelNumber)
    .orderBy("minPrice", "desc") // ページネーションには orderBy が必須
    .limit(PAGE_SIZE);

  if (previousPageData && previousPageData.length > 0) {
    const lastDoc = previousPageData[previousPageData.length - 1].__doc__;
    query = query.startAfter(lastDoc);
  }

  try {
    const snapshot = await query.get();

    // buyOffersとstore情報を並行して取得
    const buyOffersWithStores = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const affiliateStore = await firestore()
          .collection("shops")
          .doc(data.affiliateStoreId)
          .get();
        const affiliateStoreData = affiliateStore.data() as AffiliateStore;
        return {
          id: doc.id,
          ...data,
          affiliateStore: affiliateStoreData,
          __doc__: doc, // startAfter用にdoc自体を保持
        };
      })
    );

    return buyOffersWithStores;
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "買取オファーの取得に失敗しました",
    });
    router.back();
    return [];
  }
};

const useFetchBuyOffers = (car: Car) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!car?.id) return null;
    if (previousPageData && previousPageData.length === 0) return null; // これ以上データがない
    return ["buyOffers", car, pageIndex];
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    (key: [string, Car, number], previousPageData: any) => {
      const [, car, pageIndex] = key;
      return fetchBuyOffersPage(car, pageIndex, previousPageData);
    },
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  );

  // data: BuyOffer[][] なのでフラットにする
  const buyOffersSnapshotData = data
    ? data.flat().map((item) => {
        const { __doc__, ...rest } = item;
        return rest;
      })
    : [];

  const hasMore = data ? data[data.length - 1]?.length === PAGE_SIZE : false;

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    setSize(size + 1);
  };

  return {
    buyOffersSnapshotData: buyOffersSnapshotData as CarBuyOffer[],
    isLoading,
    isError: !!error,
    loadMore,
    mutate,
    hasMore,
  };
};

export default useFetchBuyOffers;
