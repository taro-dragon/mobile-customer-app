import { useEffect } from "react";
import { useStore } from "./useStore";

const useUserCarFetch = () => {
  const { user, fetchCars } = useStore();
  useEffect(() => {
    if (user) {
      fetchCars(user.id);
    }
  }, []);
};

export default useUserCarFetch;
