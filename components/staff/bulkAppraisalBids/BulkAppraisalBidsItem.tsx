import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import { Text, View } from "react-native";

type BulkAppraisalBidsItemProps = {
  bid: ExBulkAppraisalBid;
};

const BulkAppraisalBidsItem: React.FC<BulkAppraisalBidsItemProps> = ({
  bid,
}) => {
  return (
    <View>
      <Text>{bid.id}</Text>
    </View>
  );
};

export default BulkAppraisalBidsItem;
