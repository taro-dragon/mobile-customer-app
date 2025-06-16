import { useStore } from "@/hooks/useStore";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

type InitialValues = {
  name: string;
  furigana: string;
  email: string;
  phoneNumber: string;
  employeeId: string;
  isOwner: boolean;
  position: string;
  profileImageUrl?: string;
  shops?: string[];
};

const StaffEdit = () => {
  const { staff: currentStaff } = useStore();
  const { control, handleSubmit } = useForm<InitialValues>({
    defaultValues: {
      name: currentStaff?.name ?? "",
      furigana: currentStaff?.furigana ?? "",
      email: currentStaff?.email ?? "",
      phoneNumber: currentStaff?.phoneNumber ?? "",
      employeeId: currentStaff?.employeeId ?? "",
      isOwner: currentStaff?.isOwner ?? false,
      position: currentStaff?.position ?? "",
      profileImageUrl: currentStaff?.profileImageUrl ?? "",
      shops: currentStaff?.shops ?? [],
    },
  });
  return (
    <View>
      <Text>スタッフ編集</Text>
    </View>
  );
};

export default StaffEdit;
