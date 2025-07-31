import { useEffect } from "react";
import { useStore } from "../useStore";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import { loadAsyncStorage } from "@/libs/asyncStorage";

const useStaffInfoData = () => {
  const {
    staff,
    stores,
    fetchStores,
    fetchCurrentStore,
    setCurrentStore,
    fetchStaffTalks,
    fetchCurrentStoreStaffs,
  } = useStore();
  useEffect(() => {
    if (staff) {
      const shopIds = staff.shops;
      if (shopIds) {
        fetchStores(shopIds);
      }
    }
  }, [staff]);
  useEffect(() => {
    const fetchSelectedStore = async () => {
      const localStorageStoreId = await loadAsyncStorage(
        AsyncStorageKey.SELECTED_SHOP_ID
      );
      if (localStorageStoreId) {
        const store = stores.find((store) => store.id === localStorageStoreId);
        if (store) {
          setCurrentStore(store);
        } else {
          fetchCurrentStore(localStorageStoreId);
        }
        fetchStaffTalks(localStorageStoreId, staff?.id || "");
        fetchCurrentStoreStaffs(localStorageStoreId);
      }
    };
    if (stores.length > 0) {
      fetchSelectedStore();
    }
  }, [stores]);
};

export default useStaffInfoData;
