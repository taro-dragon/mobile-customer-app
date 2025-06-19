import Loader from "@/components/common/Loader";
import CheckBoxStaffItem from "@/components/staff/StaffList/CheckBoxStaffItem";
import { useStaffListContext } from "@/contexts/staff/StaffList";
import { FlatList, View } from "react-native";

const BulkAppraisalBidBidStaffSelect = () => {
  const { staffList, isLoading } = useStaffListContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <FlatList
      data={staffList}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 16,
      }}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16 }}>
          <CheckBoxStaffItem item={item} formName="managerStaffs" />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

export default BulkAppraisalBidBidStaffSelect;
