import { useStore } from "@/hooks/useStore";
import ShopSelectScreen from "@/screens/staff/shopSelect";

const ShopSelect = () => {
  const { stores } = useStore();
  return <ShopSelectScreen stores={stores} />;
};

export default ShopSelect;
