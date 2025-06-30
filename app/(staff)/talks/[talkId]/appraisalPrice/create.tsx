import { useStore } from "@/hooks/useStore";
import CreateAppraisalPriceScreen from "@/screens/staff/talks/appraisalPrice/create";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
const CreateAppraisalPrice = () => {
  const form = useForm();
  const router = useRouter();
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks } = useStore();
  const talk = staffTalks.find((talk) => talk.id === talkId);
  if (!talk) {
    router.back();
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
    });
    return null;
  }
  return (
    <FormProvider {...form}>
      <CreateAppraisalPriceScreen talk={talk} />
    </FormProvider>
  );
};

export default CreateAppraisalPrice;
