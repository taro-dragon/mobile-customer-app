import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import TextInput from "@/components/formItem/TextInput";
import { useFormContext } from "react-hook-form";
import { usePhoneAuth } from "@/hooks/usePhoneAuth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import RegistrationLayout from "./components/RegistrationLayout";
import { RegistrationFormData } from "./types";

const PhoneAuth: React.FC = () => {
  const { colors, typography } = useTheme();
  const navigation = useNavigation();
  const { handleSubmit } = useFormContext<RegistrationFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { confirmation, loading, sendVerificationCode, confirmCode } =
    usePhoneAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!confirmation) {
        await sendVerificationCode(data.phoneNumber);
      } else {
        setIsLoading(true);
        try {
          await confirmCode(data.smsCode || "");
          await firestore()
            .collection("users")
            .doc(auth().currentUser?.uid)
            .update({
              isAnonymous: false,
              familyName: data.familyName,
              givenName: data.givenName,
              postalCode: data.postalCode,
              address1: data.address1,
              address2: data.address2,
              address3: data.address3,
              lat: data.lat,
              lng: data.lng,
              phone: data.phoneNumber,
            });
          Toast.show({
            type: "success",
            text1: "登録完了",
            text2: "本登録が完了しました",
          });
          navigation.getParent()?.goBack();
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "エラー",
            text2: "認証コードが無効です",
          });
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "認証処理エラーが発生しました",
      });
    }
  });

  return (
    <>
      <RegistrationLayout
        title="電話番号認証"
        description="電話番号を入力して、SMSに表示された番号を入力してください。"
        onButtonPress={onSubmit}
        buttonDisabled={loading}
        loading={loading}
      >
        <TextInput
          keyboardType="phone-pad"
          name="phoneNumber"
          placeholder="電話番号を入力"
          readOnly={!!confirmation}
        />
        {confirmation && (
          <TextInput
            keyboardType="number-pad"
            name="smsCode"
            placeholder="SMSコードを入力"
          />
        )}
      </RegistrationLayout>

      <Modal visible={isLoading} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={{ color: colors.white, ...typography.title2 }}>
            登録処理中...
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default PhoneAuth;
