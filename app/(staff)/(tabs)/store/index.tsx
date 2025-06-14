import { useStore } from "@/hooks/useStore";
import StoreManagementScreen from "@/screens/staff/store/storeManagement";
import StaffIndexScreen from "@/screens/staff/tabs";

const Store = () => {
  const { staff } = useStore();

  if (staff?.isOwner) {
    return <StoreManagementScreen />;
  }

  return <StaffIndexScreen />;
};

export default Store;
