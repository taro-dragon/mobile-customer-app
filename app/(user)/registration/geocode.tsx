import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/formItem/TextInput";
import { useTheme } from "@/contexts/ThemeContext";
import { searchGeocode } from "@/libs/searchGeocode";
import { searchZipcode } from "@/libs/searchZipcode";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Geocode: React.FC = () => {
  const router = useRouter();
  const { colors, typography } = useTheme();
  const textStyles = useMemo(
    () => ({
      title: { ...typography.title1, color: colors.primary },
      body: { ...typography.body2, color: colors.textPrimary },
    }),
    [colors.primary, colors.textPrimary, typography.title1, typography.body2]
  );
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const zipCodeRes = await searchZipcode(data.postalCode);
      const address = `${zipCodeRes.results[0].address1}${zipCodeRes.results[0].address2}${zipCodeRes.results[0].address3}`;
      const geocodeRes = await searchGeocode(address);
      const latitude = geocodeRes.results[0].geometry.location.lat;
      const longitude = geocodeRes.results[0].geometry.location.lng;
      reset({
        postalCode: zipCodeRes.results[0].zipcode,
        address1: zipCodeRes.results[0].address1,
        address2: zipCodeRes.results[0].address2,
        address3: zipCodeRes.results[0].address3,
        lat: latitude,
        lng: longitude,
        familyName: data.familyName,
        givenName: data.givenName,
      });
      router.push("/(user)/registration/phoneAuth");
    } catch (error) {
      console.log(error);
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
              <Text style={textStyles.title}>エリア検索</Text>
              <Text style={textStyles.body}>
                あなたの現在の住まいの郵便番号を入力してください
              </Text>
              <TextInput
                maxLength={7}
                keyboardType="phone-pad"
                name="postalCode"
                placeholder="郵便番号を入力"
              />
            </View>
            <Divider />
            <View style={styles.bottomContainer}>
              <Button
                color={colors.primary}
                label="次へ"
                onPress={onSubmit}
                fullWidth
                disabled={isSubmitting}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <SafeAreaBottom />
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

export default Geocode;
