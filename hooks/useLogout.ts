import auth from "@react-native-firebase/auth";
import { useStore } from "./useStore";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const { deleteUser, clearCars, clearBulkAppraisalRequests, clearTalks } =
    useStore();
  const logout = async () => {
    try {
      await auth().signOut();
      deleteUser();
      clearCars();
      clearBulkAppraisalRequests();
      clearTalks();
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
