import CreateAppraisalPriceHeader from "@/components/staff/talks/appraisalPrice/create/CreateAppraisalPriceheader";
import { useStore } from "@/hooks/useStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const CreateAppraisalPriceScreen = () => {
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
  return (
    <View>
      <CreateAppraisalPriceHeader talk={talk} />
    </View>
  );
};

export default CreateAppraisalPriceScreen;
