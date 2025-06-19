import { useEffect } from "react";
import { useStore } from "./useStore";

const useUserInfoData = () => {
  const { user, fetchCars, fetchUserTalks, fetchBulkAppraisalRequests } =
    useStore();
  useEffect(() => {
    if (user) {
      fetchCars(user.id);
      fetchUserTalks(user.id);
      fetchBulkAppraisalRequests(user.id);
    }
  }, [user]);
  return user;
};

export default useUserInfoData;
