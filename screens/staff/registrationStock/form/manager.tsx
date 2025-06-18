import Loader from "@/components/common/Loader";
import CheckBoxStaffItem from "@/components/staff/StaffList/CheckBoxStaffItem";
import { Staff } from "@/types/firestore_schema/staff";
import { FlatList, View } from "react-native";

type RegistrationStockManagerFormScreenProps = {
  staffList?: Staff[];
  isLoading: boolean;
  mutate: () => void;
};

const RegistrationStockManagerFormScreen: React.FC<
  RegistrationStockManagerFormScreenProps
> = ({ staffList, isLoading }) => {
  if (isLoading || !staffList) {
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

export default RegistrationStockManagerFormScreen;
