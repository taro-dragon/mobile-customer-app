import Loader from "@/components/common/Loader";
import Tag from "@/components/common/Tag";
import CheckBoxStaffItem from "@/components/staff/StaffList/CheckBoxStaffItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";
import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type RegistrationStockManagerFormScreenProps = {
  staffList?: Staff[];
  isLoading: boolean;
  mutate: () => void;
};

const RegistrationStockManagerFormScreen: React.FC<
  RegistrationStockManagerFormScreenProps
> = ({ staffList, isLoading, mutate }) => {
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
          <CheckBoxStaffItem item={item} formName="selectedStaff" />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
};

export default RegistrationStockManagerFormScreen;
