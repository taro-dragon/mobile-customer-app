import AnswerCarCheckRequestScreen from "@/screens/users/talks/AnswerCarCheckRequest";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";
import { useStore } from "@/hooks/useStore";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import { AnswerCarCheckRequestFormData } from "@/constants/schemas/answerCarCheckRequest";

const AnswerCarCheckRequest = () => {
  const { messageId, shopId, talkId } = useLocalSearchParams<{
    messageId: string;
    shopId: string;
    talkId: string;
  }>();
  const { userTalks } = useStore();
  const talk = userTalks.find((talk) => talk.id === talkId) as
    | TalkWithAffiliate
    | undefined;

  const router = useRouter();
  const { handleSubmit } = useFormContext<AnswerCarCheckRequestFormData>();

  const onSubmit = handleSubmit(async (data: AnswerCarCheckRequestFormData) => {
    try {
      const answeredCarCheckRequest = functions().httpsCallable(
        "answeredCarCheckRequest"
      );

      const firestoreData = {
        ...data,
        messageId,
        shopId,
        talkId,
        preferredDates: data.preferredDates?.map((d) => ({
          ...d,
          datetime:
            d.datetime instanceof Date ? d.datetime.toISOString() : d.datetime,
        })),
      };

      console.log("firestoreData", firestoreData);

      await answeredCarCheckRequest(firestoreData);

      Toast.show({
        type: "success",
        text1: "現車確認依頼の回答を送信しました",
      });

      router.back();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "送信に失敗しました",
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  });

  return <AnswerCarCheckRequestScreen onSubmit={onSubmit} />;
};

export default AnswerCarCheckRequest;
