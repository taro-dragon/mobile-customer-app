import { useEffect } from "react";
import { useStore } from "./useStore";

const useUserInfoData = () => {
  const { user, fetchCars, fetchUserTalks } = useStore();
  useEffect(() => {
    if (user) {
      fetchCars(user.id);
      fetchUserTalks(user.id);
    }
  }, [user]);
  return user;
};

export default useUserInfoData;
