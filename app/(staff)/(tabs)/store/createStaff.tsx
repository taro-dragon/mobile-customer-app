import { useStore } from "@/hooks/useStore";
import CreateStaffScreen from "@/screens/staff/store/storeManagement/createStaff";
import { FormProvider, useForm } from "react-hook-form";
import functions from "@react-native-firebase/functions";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const createStaffFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  furigana: z
    .string()
    .min(1, "フリガナを入力してください")
    .regex(/^[ァ-ヶー]+$/, "カタカナのみを入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  position: z.string().optional(),
  employeeId: z.string().optional(),
  isOwner: z.boolean(),
  clientId: z.string().min(1, "クライアントIDは必須です"),
  shops: z.array(z.string()).min(1, "店舗IDは必須です"),
});

export type CreateStaffForm = z.infer<typeof createStaffFormSchema>;

const CreateStaff = () => {
  const { currentStore } = useStore();
  const router = useRouter();
  const form = useForm<CreateStaffForm>({
    defaultValues: {
      isOwner: false,
      clientId: currentStore?.clientId || "",
      shops: [currentStore?.id],
    },
    resolver: zodResolver(createStaffFormSchema),
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
        text2: error instanceof Error ? error.message : "不明なエラー",
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
