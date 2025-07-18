import { useStore } from "@/hooks/useStore";
import CreateAppraisalPriceScreen from "@/screens/staff/talks/appraisalPrice/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import firestore from "@react-native-firebase/firestore";

export const createAppraisalPriceZodSchema = z.object({
  appraisalPrice: z.string().min(1, { message: "査定金額は必須です" }),
  appraisalPriceNote: z.string().optional(),
});

const CreateAppraisalPrice = () => {
  const form = useForm({
    resolver: zodResolver(createAppraisalPriceZodSchema),
    defaultValues: {
      appraisalPrice: "",
      appraisalPriceNote: "",
    },
  });
  const router = useRouter();
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks, staff } = useStore();
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
      await firestore().runTransaction(async (transaction) => {
        const messageRef = await firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .doc();
        const talkRef = await firestore().collection("talks").doc(talkId);
        await transaction.set(messageRef, {
          talkId,
          appraisalPrice: data.appraisalPrice,
          appraisalPriceNote: data.appraisalPriceNote || "",
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderType: "staff",
          senderId: staff?.id,
          type: "appraisalPrice",
          readBy: [],
          isOpened: false,
          text: "査定金額が提示されました",
        });
        await transaction.update(talkRef, {
          lastMessage: "査定金額が提示されました",
          lastMessageAt: firestore.Timestamp.now(),
        });
      });
      Toast.show({
        type: "success",
        text1: "査定金額を提示しました",
      });
      router.back();
    } catch (error) {
      throw error;
    }
  };
  return (
    <FormProvider {...form}>
      <CreateAppraisalPriceScreen talk={talk} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default CreateAppraisalPrice;
