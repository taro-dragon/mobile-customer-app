import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";

import useFetchStore from "@/hooks/staff/useFetchStore";

import ShopScreen from "@/screens/staff/shop";

import { useLocalSearchParams } from "expo-router";

const Shop = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { store, isLoading } = useFetchStore(id);

  if (isLoading || !store) {
    return <ShopDetailSkeleton />;
  }
  return <ShopScreen shop={store} />;
};

export default Shop;
