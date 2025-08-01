import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import CheckBoxStaffItem from "@/components/staff/StaffList/CheckBoxStaffItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { View, FlatList } from "react-native";

type Props = {
  staffs: Staff[];
};

const CreateTalkIndexScreen: React.FC<Props> = ({ staffs }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { watch } = useFormContext();
  const staffIds = watch("staffIds");
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={staffs}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 16,
        }}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <CheckBoxStaffItem item={item} formName="staffIds" />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
      <Divider />
      <View style={{ padding: 16 }}>
        <Button
          label="次へ"
          onPress={() => router.push("/createTalk/talkSetting")}
          color={colors.primary}
          disabled={staffIds.length === 0}
        />
      </View>
      <SafeAreaBottom />
    </View>
  );
};

export default CreateTalkIndexScreen;
