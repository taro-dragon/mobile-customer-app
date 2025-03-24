import { useStore } from "./useStore";
import { Shop } from "@/types/models/Shop";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";

/**
 * ブロックリストの店舗情報を取得するフック
 * SWRを使用してキャッシングとデータの再検証を行う
 */
export const useFetchBlockList = () => {
  const { user } = useStore();
  const fetcher = async (blockIdList: string[] | undefined) => {
    if (!blockIdList || blockIdList.length === 0) {
      return [];
    }

    try {
      const shopsPromises = blockIdList.map(async (id) => {
        const shop = await firestore().collection("shops").doc(id).get();
        const shopData = shop.data();
        if (!shopData) return null;
        return { id, ...shopData } as Shop;
      });

      const shops = await Promise.all(shopsPromises);
      return shops.filter(Boolean);
    } catch (error) {
      console.error("Error fetching block list:", error);
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR(
    user?.blockIdList ? ["blockList", user.blockIdList] : null,
    () => fetcher(user?.blockIdList),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  );

  return {
    blockList: data as Shop[] | undefined,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
};
