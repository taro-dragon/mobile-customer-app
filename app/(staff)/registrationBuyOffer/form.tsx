import {
  RegistrationBuyOfferFormData,
  registrationBuyOfferSchema,
} from "@/constants/schemas/registrationBuyOfferSchema";
import RegistrationBuyOfferFormScreen from "@/screens/staff/registrationBuyOffer/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

const RegistrationBuyOfferForm = () => {
  const form = useForm<RegistrationBuyOfferFormData>({
    resolver: zodResolver(registrationBuyOfferSchema),
    defaultValues: {
      minPrice: undefined,
      maxPrice: undefined,
      comment: undefined,
      expiresAt: new Date(),
    },
  });
  const { handleSubmit } = form;
  const onSubmit = (data: RegistrationBuyOfferFormData) => {
    console.log(data);
  };
  const confirmButton = () => {
    Alert.alert("買取オファーを登録する", "買取オファーを登録しますか？", [
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
  return (
    <RegistrationBuyOfferFormScreen
      confirmButton={handleSubmit(confirmButton)}
      form={form}
    />
  );
};

export default RegistrationBuyOfferForm;
