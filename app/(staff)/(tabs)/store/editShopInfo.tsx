import { useStore } from "@/hooks/useStore";
import EditShopInfoScreen from "@/screens/staff/store/storeManagement/editShopInfo";
import { useForm, FormProvider } from "react-hook-form";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

type FormData = {
  businessHours: string;
  shopCatchCopy: string;
  description: string;
  imageUrls: string[];
  holiday: string;
};

const EditShopInfo = () => {
  const { currentStore } = useStore();
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      businessHours: currentStore?.businessHours,
      shopCatchCopy: currentStore?.shopCatchCopy,
      description: currentStore?.description,
      imageUrls: currentStore?.imageUrls,
      holiday: currentStore?.holiday,
    },
  });
  const { handleSubmit } = form;
  const submit = async (data: FormData) => {
    const dataToUpdate = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    try {
      await firestore()
        .collection("shops")
        .doc(currentStore?.id)
        .update(dataToUpdate);
      Toast.show({
        type: "success",
        text1: "店舗情報を更新しました",
      });
      router.back();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "店舗情報の更新に失敗しました",
        text2: "もう一度お試しください",
      });
    }
  };
  const onConfirm = () => {
    Alert.alert(
      "店舗情報を更新しますか？",
      "更新する場合はOKを押してください",
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
      <EditShopInfoScreen onConfirm={onConfirm} />
    </FormProvider>
  );
};

export default EditShopInfo;
