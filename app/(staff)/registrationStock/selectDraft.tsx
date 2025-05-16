import useFetchStockDrafts from "@/hooks/staff/useFetchStockDrafts";
import SelectDraftScreen from "@/screens/staff/registrationStock/selectDraft";
import { View } from "react-native";

const SelectDraft = () => {
  const { data, error, mutate, isLoading } = useFetchStockDrafts();
  return <SelectDraftScreen StockDraft={data} />;
};

export default SelectDraft;
