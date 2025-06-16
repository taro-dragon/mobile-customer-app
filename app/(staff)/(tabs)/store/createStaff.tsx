import { useStore } from "@/hooks/useStore";
import CreateStaffScreen from "@/screens/staff/store/storeManagement/createStaff";
import { FormProvider, useForm } from "react-hook-form";
import functions from "@react-native-firebase/functions";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

type CreateStaffForm = {
  name: string;
  furigana: string;
  email: string;
  phoneNumber: string;
  position?: string;
  employeeId?: string;
  isOwner: boolean;
  clientId: string;
  shops: string[];
};

const CreateStaff = () => {
  const { currentStore } = useStore();
  const router = useRouter();
  const form = useForm<CreateStaffForm>({
    defaultValues: {
      isOwner: false,
      clientId: currentStore?.clientId || "",
      shops: [currentStore?.id],
    },
  });
  const { handleSubmit } = form;
  const submit = async (data: CreateStaffForm) => {
    try {
      const createStaffUser = functions().httpsCallable("createStaffUser");
      await createStaffUser(data);
      Toast.show({
        type: "success",
        text1: "スタッフを登録しました",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "スタッフの登録に失敗しました",
      });
    }
  };
  const onConfirm = () => {
    Alert.alert(
      "スタッフ登録をしてもよろしいですか？",
      "登録する場合はOKを押してください",
      [
        {
          text: "キャンセル",
          style: "destructive",
        },
        { text: "OK", onPress: () => handleSubmit(submit)() },
      ]
    );
  };
  return (
    <FormProvider {...form}>
      <CreateStaffScreen onConfirm={onConfirm} />
    </FormProvider>
  );
};

export default CreateStaff;
