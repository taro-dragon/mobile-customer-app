import { useEffect } from "react";
import { useStore } from "../useStore";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import { loadAsyncStorage, saveAsyncStorage } from "@/libs/asyncStorage";

const useStaffInfoData = () => {
  const {
    staff,
    stores,
    fetchStores,
    fetchCurrentStore,
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
        fetchCurrentStore(localStorageStoreId);
        fetchStaffTalks(localStorageStoreId, staff?.id || "");
        fetchCurrentStoreStaffs(localStorageStoreId);
      } else {
        await saveAsyncStorage(AsyncStorageKey.SELECTED_SHOP_ID, stores[0].id);
        fetchCurrentStore(stores[0].id);
        fetchStaffTalks(stores[0].id, staff?.id || "");
      }
    };
    if (stores.length > 0) {
      fetchSelectedStore();
    }
  }, [stores]);
};

export default useStaffInfoData;
