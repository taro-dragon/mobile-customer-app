import CustomerScreen from "@/components/staff/customer/CustomerScreen";
import useFetchCustomer from "@/hooks/staff/useFetchCustomer";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const Customer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { customer, isLoading } = useFetchCustomer(id);
  if (isLoading || !customer) {
    return <View />;
  }
  return <CustomerScreen customer={customer} />;
};

export default Customer;
