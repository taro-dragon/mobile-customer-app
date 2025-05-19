import { useBulkAppraisalContext } from "@/contexts/staff/BulkAppraisalContext";
import { Text, View } from "react-native";

const BulkAppraisalBidScreen = () => {
  const { requests } = useBulkAppraisalContext();
  console.log(requests);
  return (
    <View>
      <Text>一括査定入札</Text>
    </View>
  );
};

export default BulkAppraisalBidScreen;
