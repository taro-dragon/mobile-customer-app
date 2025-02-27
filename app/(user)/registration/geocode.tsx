import TextInput from "@/components/formItem/TextInput";
import { searchGeocode } from "@/libs/searchGeocode";
import { searchZipcode } from "@/libs/searchZipcode";
import { useRouter } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";
import RegistrationLayout from "./components/RegistrationLayout";
import { RegistrationFormData } from "./types";
import Toast from "react-native-toast-message";

const Geocode: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext<RegistrationFormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const zipCodeRes = await searchZipcode(data.postalCode);
      const address = `${zipCodeRes.results[0].address1}${zipCodeRes.results[0].address2}${zipCodeRes.results[0].address3}`;
      const geocodeRes = await searchGeocode(address);
      const latitude = geocodeRes.results[0].geometry.location.lat;
      const longitude = geocodeRes.results[0].geometry.location.lng;

      reset({
        ...data,
        postalCode: zipCodeRes.results[0].zipcode,
        address1: zipCodeRes.results[0].address1,
        address2: zipCodeRes.results[0].address2,
        address3: zipCodeRes.results[0].address3,
        lat: latitude,
        lng: longitude,
      });

      router.push("/(user)/registration/phoneAuth");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "住所情報の取得に失敗しました",
      });
    }
  });

  return (
    <RegistrationLayout
      title="エリア検索"
      description="あなたの現在の住まいの郵便番号を入力してください"
      onButtonPress={onSubmit}
      buttonDisabled={isSubmitting}
      loading={isSubmitting}
    >
      <TextInput
        maxLength={7}
        keyboardType="phone-pad"
        name="postalCode"
        placeholder="郵便番号を入力"
      />
    </RegistrationLayout>
  );
};

export default Geocode;
