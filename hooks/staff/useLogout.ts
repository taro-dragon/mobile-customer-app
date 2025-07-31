import auth from "@react-native-firebase/auth";
import { useStore } from "../useStore";
import Toast from "react-native-toast-message";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import { removeAsyncStorage } from "@/libs/asyncStorage";

export const useLogout = () => {
  const { deleteStaff, clearCurrentStore, clearStaffTalks } = useStore();
  const logout = async () => {
    try {
      await auth().signOut();
      deleteStaff();
      clearCurrentStore();
      clearStaffTalks();
      await removeAsyncStorage(AsyncStorageKey.SELECTED_SHOP_ID);
      Toast.show({
        type: "success",
        text1: "ログアウトしました",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
