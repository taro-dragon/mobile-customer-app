import { useStore } from "@/hooks/useStore";
import CarCheckRequestScreen from "@/screens/staff/talks/carCheckRequest";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

const CarCheckRequest = () => {
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks } = useStore();
  const router = useRouter();
  const talk = staffTalks.find((talk) => talk.id === talkId);
  if (!talk || !talk.preferredInfo) {
    router.back();
    return null;
  }
  return <CarCheckRequestScreen preferredInfo={talk.preferredInfo} />;
};

export default CarCheckRequest;
