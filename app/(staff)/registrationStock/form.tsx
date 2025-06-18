import useFetchStaffList from "@/hooks/staff/useFetchStafflist";
import { useStore } from "@/hooks/useStore";
import RegistrationStockFormScreen from "@/screens/staff/registrationStock/formTab";

const RegistrationStockForm = () => {
  const { currentStore } = useStore();
  const { staffList, isLoading, mutate } = useFetchStaffList(
    currentStore?.id || ""
  );
  return (
    <RegistrationStockFormScreen
      staffList={staffList}
      isLoading={isLoading}
      mutate={mutate}
    />
  );
};

export default RegistrationStockForm;
