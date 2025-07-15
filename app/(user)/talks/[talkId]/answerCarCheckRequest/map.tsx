import SearchMap from "@/components/map/SearchMap";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

const AnswerCarCheckRequestMap = () => {
  const { setValue } = useFormContext();
  const router = useRouter();
  const handleSubmit = async (lat: number, lng: number, address?: string) => {
    setValue("location", { lat, lng, address });
    router.back();
  };
  return <SearchMap submit={handleSubmit} submitButtonText="選択" />;
};

export default AnswerCarCheckRequestMap;
