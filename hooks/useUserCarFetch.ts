import { useEffect } from "react";
import { useStore } from "./useStore";

const useUserCarFetch = () => {
  const { customer, fetchCars } = useStore();
  useEffect(() => {
    if (customer) {
      fetchCars(customer.id);
    }
  }, [customer]);
};

export default useUserCarFetch;
