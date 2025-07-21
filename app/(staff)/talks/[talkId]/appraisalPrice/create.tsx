import { useStore } from "@/hooks/useStore";
import CreateAppraisalPriceScreen from "@/screens/staff/talks/appraisalPrice/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { submitAppraisalPrice } from "@/cloudFunctions/staff/talk/submitAppraisalPrice";
import { useModal } from "@/contexts/ModalContext";

export const createAppraisalPriceZodSchema = z.object({
  appraisalPrice: z.string().min(1, { message: "査定金額は必須です" }),
  appraisalPriceNote: z.string().optional(),
  expiryDate: z.date(),
});

const CreateAppraisalPrice = () => {
  const form = useForm({
    resolver: zodResolver(createAppraisalPriceZodSchema),
    defaultValues: {
      appraisalPrice: "",
      appraisalPriceNote: "",
      expiryDate: new Date(),
    },
  });
  const router = useRouter();
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks, staff } = useStore();
  const { showModal, hideModal } = useModal();
  const talk = staffTalks.find((talk) => talk.id === talkId);
  if (!talk) {
    router.back();
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
    });
    return null;
  }
  const onSubmit = async (
    data: z.infer<typeof createAppraisalPriceZodSchema>
  ) => {
    try {
      showModal("送信中");
      await submitAppraisalPrice({
        talkId,
        shopId: talk.affiliateStoreId,
        appraisalPrice: Number(data.appraisalPrice),
        appraisalPriceNote: data.appraisalPriceNote,
        expiryDate: data.expiryDate.toISOString(),
      });
      Toast.show({
        type: "success",
        text1: "査定金額を提示しました",
      });
      router.back();
    } catch (error) {
      throw error;
    } finally {
      hideModal();
    }
  };
  return (
    <FormProvider {...form}>
      <CreateAppraisalPriceScreen talk={talk} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default CreateAppraisalPrice;
