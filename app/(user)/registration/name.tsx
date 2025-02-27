import React from "react";
import { useRouter } from "expo-router";
import TextInput from "@/components/formItem/TextInput";
import { useFormContext } from "react-hook-form";
import RegistrationLayout from "./components/RegistrationLayout";
import { RegistrationFormData } from "./types";

const Name = () => {
  const router = useRouter();
  const { watch } = useFormContext<RegistrationFormData>();
  const { familyName, givenName } = watch();

  return (
    <RegistrationLayout
      title="情報登録"
      description="あなたのお名前を入力してください"
      onButtonPress={() => router.replace("/(user)/registration/geocode")}
      buttonDisabled={!familyName || !givenName}
    >
      <TextInput
        keyboardType="default"
        name="familyName"
        placeholder="姓"
        maxLength={10}
      />
      <TextInput
        keyboardType="default"
        name="givenName"
        placeholder="名"
        maxLength={10}
      />
    </RegistrationLayout>
  );
};

export default Name;
