import auth from "@react-native-firebase/auth";
import { useStore } from "../useStore";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const { deleteStaff, clearCurrentStore, clearStaffTalks } = useStore();
  const logout = async () => {
    try {
      await auth().signOut();
      deleteStaff();
      clearCurrentStore();
      clearStaffTalks();
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
