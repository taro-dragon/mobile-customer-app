import { ArrowLeft } from "lucide-react-native";
import auth from "@react-native-firebase/auth";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigation, useRouter } from "expo-router";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import React, { useMemo, useState } from "react";
import TextInput from "@/components/formItem/TextInput";
import { Platform } from "react-native";
import { useFormContext } from "react-hook-form";
import { usePhoneAuth } from "@/hooks/usePhoneAuth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const PhoneAuth: React.FC = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { handleSubmit } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { confirmation, loading, sendVerificationCode, confirmCode, error } =
    usePhoneAuth();
  const textStyles = useMemo(
    () => ({
      title: { ...typography.title1, color: colors.primary },
      body: { ...typography.body2, color: colors.textPrimary },
    }),
    [colors.primary, colors.textPrimary, typography.title1, typography.body2]
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!confirmation) {
        await sendVerificationCode(data.phoneNumber);
      } else {
        setIsLoading(true);
        try {
          await confirmCode(data.smsCode);
          await firestore()
            .collection("customers")
            .doc(auth().currentUser?.uid)
            .update({
              isAnonymous: false,
              info: {
                familyName: data.familyName,
                givenName: data.givenName,
                postalCode: data.postalCode,
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                lat: data.lat,
                lng: data.lng,
                phone: data.phoneNumber,
              },
            });
          Toast.show({
            type: "success",
            text1: "登録完了",
            text2: "本登録が完了しました",
          });
          navigation.getParent()?.goBack();
        } catch (err) {
          throw err;
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <ArrowLeft size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={textStyles.title}>電話番号認証</Text>
              <Text style={textStyles.body}>
                電話番号を入力して、SMSに表示された番号を入力してください。
              </Text>

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
            </View>
            <Divider />
            <View style={styles.bottomContainer}>
              <Button
                color={colors.primary}
                label="次へ"
                onPress={onSubmit}
                fullWidth
                disabled={loading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <SafeAreaBottom />
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  bottomContainer: { padding: 16 },
});

export default PhoneAuth;
