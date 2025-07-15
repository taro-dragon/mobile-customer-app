import AnswerCarCheckRequestScreen from "@/screens/users/talks/AnswerCarCheckRequest";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import Toast from "react-native-toast-message";

const AnswerCarCheckRequest = () => {
  const { messageId } = useLocalSearchParams<{ messageId: string }>();
  const router = useRouter();
  const { handleSubmit } = useFormContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("送信データ:", data);

      Toast.show({
        type: "success",
        text1: "現車確認依頼の回答を送信しました",
      });

      router.back();
    } catch (error) {
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
