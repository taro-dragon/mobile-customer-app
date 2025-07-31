import { useEffect } from "react";
import { useStore } from "../useStore";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import { loadAsyncStorage, saveAsyncStorage } from "@/libs/asyncStorage";
import { useRouter } from "expo-router";

const useStaffInfoData = () => {
  const router = useRouter();
  const {
    staff,
    stores,
    currentStore,
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
    if (currentStore) {
      saveAsyncStorage(AsyncStorageKey.SELECTED_SHOP_ID, currentStore.id);
      fetchStaffTalks(currentStore.id, staff?.id || "");
      fetchCurrentStoreStaffs(currentStore.id);
      router.replace("/(staff)/(tabs)");
      if (router.canDismiss()) {
        router.dismissAll();
      }
    }
  }, [currentStore]);
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
      }
    };
    if (stores.length > 0) {
      fetchSelectedStore();
    }
  }, [stores]);
};

export default useStaffInfoData;
