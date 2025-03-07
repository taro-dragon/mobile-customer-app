import { useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { ManagementCompany } from "@/types/firestore_schema/managementCompanies";
import { useFormContext } from "react-hook-form";

export type AffiliateStoreWithCompany = AffiliateStore & {
  managementCompany?: ManagementCompany;
};

export type ShopFilters = {
  prefecture?: string[]; // 都道府県
};

const PAGE_SIZE = 10;

/**
 * 加盟店データを取得するためのカスタムフック
 * useFormContextからフィルター条件を取得し、useSWRInfinityで無限スクロールを実装
 */
const useShopSearch = () => {
  const { watch } = useFormContext();

  // フォームから都道府県フィルターを取得
  const prefectureFilter = watch("prefecture");

  // キーの生成関数（ページインデックスを受け取り、キーを返す）
  const getKey = (
    pageIndex: number,
    previousPageData: AffiliateStoreWithCompany[] | null
  ) => {
    // 前のページがない、または前のページが空の場合は終了
    if (previousPageData && !previousPageData.length) return null;

    // フィルターをキーに含める
    const filterKey = JSON.stringify({ prefecture: prefectureFilter });

    // 最初のページ
    if (pageIndex === 0) {
      return `shops-${filterKey}-${pageIndex}`;
    }

    // 次のページのキー
    const lastItem = previousPageData![previousPageData!.length - 1];
    return `shops-${filterKey}-${pageIndex}-${lastItem.id}`;
  };

  // データフェッチャー関数
  const fetcher = async (key: string) => {
    const parts = key.split("-");
    const pageIndex = parseInt(parts[parts.length - 2], 10);
    const lastDocId = parts.length > 3 ? parts[parts.length - 1] : null;

    let query: FirebaseFirestoreTypes.Query = firestore().collection("shops");

    if (prefectureFilter && prefectureFilter.length > 0) {
      query = query.where("address1", "in", prefectureFilter);
    }

    // ページネーション
    if (lastDocId && pageIndex > 0) {
      const lastDocSnapshot = await firestore()
        .collection("shops")
        .doc(lastDocId)
        .get();
      query = query.startAfter(lastDocSnapshot);
    }

    const snapshot = await query.limit(PAGE_SIZE).get();

    const shops: AffiliateStoreWithCompany[] = [];

    for (const doc of snapshot.docs) {
      const shopData = doc.data() as AffiliateStore;
      const shop: AffiliateStoreWithCompany = {
        ...shopData,
        id: doc.id,
      };

      if (shopData.managementCompanyId) {
        try {
          const companySnapshot = await firestore()
            .collection("clients")
            .doc(shopData.managementCompanyId)
            .get();

          if (companySnapshot.exists) {
            const companyData = companySnapshot.data() as ManagementCompany;
            shop.managementCompany = {
              ...companyData,
              id: companySnapshot.id,
            };
          }
        } catch (error) {
          console.error("Error fetching management company:", error);
        }
      }

      shops.push(shop);
    }

    return shops;
  };

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      persistSize: true,
    }
  );

  useEffect(() => {
    mutate();
    setSize(1);
  }, [prefectureFilter, mutate, setSize]);

  const shops = data ? data.flat() : [];

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isRefreshing = isValidating && data && data.length === size;

  const loadMore = useCallback(() => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [isReachingEnd, isLoadingMore, setSize, size]);

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    shops,
    error,
    isLoading: !data && !error,
    isLoadingMore,
    isRefreshing,
    isReachingEnd,
    loadMore,
    refresh,
    size,
    setSize,
  };
};

export default useShopSearch;
