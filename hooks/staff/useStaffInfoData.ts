import { useEffect } from "react";
import { useStore } from "../useStore";

const useStaffInfoData = () => {
  const { staff, fetchCars, fetchUserTalks } = useStore();
  useEffect(() => {
    if (staff) {
      console.log(staff);
      // fetchCars(staff.id);
      // fetchUserTalks(staff.id);
    }
  }, [staff]);
};

export default useStaffInfoData;
