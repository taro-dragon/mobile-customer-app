import Loader from "@/components/common/Loader";
import CheckBoxStaffItem from "@/components/staff/StaffList/CheckBoxStaffItem";
import { useStore } from "@/hooks/useStore";
import { FlatList, View } from "react-native";

const RegistrationStockManagerFormScreen: React.FC = () => {
  const { currentStoreStaffs, currentStoreStaffsLoading } = useStore();
  if (currentStoreStaffsLoading || !currentStoreStaffs) {
    return <Loader />;
  }

  return (
    <FlatList
      data={currentStoreStaffs}
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

export default RegistrationStockManagerFormScreen;
