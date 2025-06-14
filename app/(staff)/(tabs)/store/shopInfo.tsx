import { useStore } from "@/hooks/useStore";
import ShopInfoScreen from "@/screens/staff/store/storeManagement/shopInfo";
import { Text } from "react-native";

const ShopInfo = () => {
  const { currentStore, staff } = useStore();
  const isOwner = !!staff?.isOwner;
  if (!currentStore) {
    return <Text>店舗情報が見つかりません</Text>;
  }
  return <ShopInfoScreen store={currentStore} isOwner={isOwner} />;
};

export default ShopInfo;
