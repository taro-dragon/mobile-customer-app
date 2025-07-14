import { Alert } from "react-native";
import { useFormContext } from "react-hook-form";
import firestore from "@react-native-firebase/firestore";
import { RegistrationBuyOfferFormData } from "@/constants/schemas/registrationBuyOfferSchema";
import RegistrationBuyOfferFormScreen from "@/screens/staff/registrationBuyOffer/form";
import { useStore } from "@/hooks/useStore";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import Loader from "@/components/common/Loader";

const RegistrationBuyOfferForm = () => {
  const { getValues } = useFormContext();
  const { currentStore, currentStoreStaffs, currentStoreStaffsLoading } =
    useStore();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<RegistrationBuyOfferFormData>();
  console.log(errors);
  const { modelNumber } = getValues();
  const onSubmit = async (data: RegistrationBuyOfferFormData) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (value === undefined) return false;
        if (key === "maxContactCount" && data.maxContact === "unlimited")
          return false;
        return true;
      })
    );
    const normalizedSearchModelNumber = modelNumber.replace(/[\s\u3000]/g, "");
    try {
      const existingOffers = await firestore()
        .collection("buyOffers")
        .where("grade", "==", getValues("grade"))
        .where("model", "==", getValues("model"))
        .where("year", "==", getValues("year"))
        .where("maker", "==", getValues("maker"))
        .where("modelNumber", "==", normalizedSearchModelNumber)
        .where("affiliateStoreId", "==", currentStore?.id)
        .where("expiresAt", ">", new Date())
        .get();

      if (!existingOffers.empty) {
        throw new Error("同じ条件の買取オファーが既に登録されています。");
      }
      const submitData = {
        ...filteredData,
        managerStaffs: data.managerStaffs,
        affiliateStoreId: currentStore?.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        grade: getValues("grade"),
        model: getValues("model"),
        year: getValues("year"),
        maker: getValues("maker"),
        modelNumber: normalizedSearchModelNumber,
        contactUsers: [],
      };
      await firestore().collection("buyOffers").add(submitData);
      Toast.show({
        type: "success",
        text1: "買取オファーの登録に成功しました",
      });
      router.dismissAll();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "買取オファーの登録に失敗しました",
        text2:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
      });
    }
  };
  const confirmButton = () => {
    Alert.alert("確認", "買取オファーの登録をしてもよろしいですか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "登録する",
        onPress: () => handleSubmit(onSubmit)(),
      },
    ]);
  };
  if (currentStoreStaffsLoading || !currentStoreStaffs) {
    return <Loader />;
  }
  return (
    <RegistrationBuyOfferFormScreen
      confirmButton={handleSubmit(confirmButton)}
      staffList={currentStoreStaffs}
    />
  );
};

export default RegistrationBuyOfferForm;
