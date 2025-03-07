import { useCallback, useEffect, useState } from "react";
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
 * 検索ボタンを押したタイミングでフィルターを適用
 */
const useShopSearch = () => {
  const { getValues, resetField } = useFormContext();

  // フィルター状態を内部で管理
  const [activeFilters, setActiveFilters] = useState<ShopFilters>({});
  // フィルターが変更されたかどうかのフラグ
  const [isFilterChanged, setIsFilterChanged] = useState(true); // 初期値をtrueに変更

  // キーの生成関数（ページインデックスを受け取り、キーを返す）
  const getKey = (
    pageIndex: number,
    previousPageData: AffiliateStoreWithCompany[] | null
  ) => {
    // 前のページがない、または前のページが空の場合は終了
    if (previousPageData && !previousPageData.length) return null;

    // フィルターをキーに含める
    const filterKey = JSON.stringify(activeFilters);

    // 最初のページ
    if (pageIndex === 0) {
      return `shops-${filterKey}-${pageIndex}`;
    }

    // 次のページのキー
    const lastItem = previousPageData![previousPageData!.length - 1];
    return `shops-${filterKey}-${pageIndex}-${lastItem.id}`;
  };

  const fetcher = async (key: string) => {
    const parts = key.split("-");
    const pageIndex = parseInt(parts[parts.length - 2], 10);
    const lastDocId = parts.length > 3 ? parts[parts.length - 1] : null;

    // クエリの構築
    let query: FirebaseFirestoreTypes.Query = firestore().collection("shops");

    // 都道府県フィルターの適用
    if (activeFilters.prefecture && activeFilters.prefecture.length > 0) {
      query = query.where("address1", "in", activeFilters.prefecture);
    }

    // ページネーション
    if (lastDocId && pageIndex > 0) {
      const lastDocSnapshot = await firestore()
        .collection("shops")
        .doc(lastDocId)
        .get();
      query = query.startAfter(lastDocSnapshot);
    }

    // データ取得
    const snapshot = await query.limit(PAGE_SIZE).get();

    // 結果の変換
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

  // useSWRInfiniteフックの使用
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

  // フィルターが変更されたら最初のページから再取得
  useEffect(() => {
    if (isFilterChanged) {
      mutate();
      setSize(1);
      setIsFilterChanged(false);
    }
  }, [isFilterChanged, mutate, setSize]);

  // 初回マウント時にデータを取得
  useEffect(() => {
    // コンポーネントがマウントされた時点で一度データを取得
    mutate();
  }, [mutate]);

  // 検索ボタンが押されたときに呼び出す関数
  const applyFilters = useCallback(() => {
    // フォームから現在の値を取得
    const formValues = getValues();

    // フィルターを作成
    const newFilters: ShopFilters = {};

    if (formValues.prefecture && formValues.prefecture.length > 0) {
      newFilters.prefecture = formValues.prefecture;
    }

    // フィルターを適用
    setActiveFilters(newFilters);
    setIsFilterChanged(true);
  }, [getValues]);

  // 全てのページのデータを結合
  const shops = data ? data.flat() : [];

  // 次のページがあるかどうか
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

  // フィルターをリセットする関数
  const resetFilters = useCallback(() => {
    setActiveFilters({});
    resetField("prefecture");
    setIsFilterChanged(true);
  }, [resetField]);

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
    applyFilters, // 検索ボタンを押したときに呼び出す関数
    resetFilters, // フィルターをリセットする関数
    activeFilters, // 現在適用されているフィルター
  };
};

export default useShopSearch;
