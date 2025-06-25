import { useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useTheme } from "@/contexts/ThemeContext";
import DisplaySelectItem from "../../../components/registrationCar/form/DisplaySelectItem";
import TakePhoto from "../../../components/registrationCar/form/TakePhoto";
import TextInput from "../../../components/registrationCar/form/TextInput";
import ColorSelect from "../../../components/registrationCar/form/ColorSelect";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useMemo } from "react";
import createRegistrationYear from "@/libs/createRegistrationYear";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";

const RegistrationCarForm = () => {
  const { user } = useStore();
  const { colors, typography } = useTheme();
  const router = useRouter();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const { grade, model, year, maker, modelNumber } = watch();
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const carRef = firestore().collection("cars").doc();
      const images: { [key: string]: string | null } = {
        front: data.front,
        back: data.back,
        left: data.left,
        right: data.right,
        interior: data.interior,
        other1: data.other1,
        other2: data.other2,
        other3: data.other3,
        other4: data.other4,
        other5: data.other5,
        other6: data.other6,
      };
      const downloadURLs: { [key: string]: string } = {};
      for (const [key, image] of Object.entries(images)) {
        if (image) {
          const imageRef = storage()
            .ref()
            .child(`cars/${carRef.id}/${key}.jpg`);
          await imageRef.putFile(image);
          const downloadURL = await imageRef.getDownloadURL();
          downloadURLs[key] = downloadURL;
        }
      }
      const carData = {
        id: carRef.id,
        ownerId: user?.id,
        maker,
        model,
        year,
        grade,
        modelNumber: data.modelNumber,
        images: downloadURLs,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        description: data.description,
        color: data.color,
        firstRegistrationYear: Number(data.firstRegistrationYear),
      };
      await carRef.set(carData);
      Toast.show({
        type: "success",
        text1: "登録完了",
        text2:
          "まだ一括査定は依頼していません。一括査定は詳細画面より依頼できます",
      });
      router.dismissTo("/(user)/(tabs)");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "車両登録エラーが発生しました",
      });
    }
  });
  const registrationYearOptions = useMemo(
    () => [
      {
        label: "不明",
        value: "not_specified",
      },
      ...createRegistrationYear(),
    ],
    [year]
  );

  const photoErrors = [
    errors.front,
    errors.back,
    errors.left,
    errors.right,
    errors.interior,
  ].filter(Boolean);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
        <View
          style={{
            padding: 16,
            backgroundColor: colors.backgroundSecondary,
            gap: 8,
          }}
        >
          <DisplaySelectItem label="メーカー" value={carData.maker.name} />
          <DisplaySelectItem label="車種" value={carData.model.name} />
          <DisplaySelectItem label="年式" value={carData.year.year} />
          <DisplaySelectItem label="グレード" value={carData.grade.gradeName} />
          <DisplaySelectItem label="型番" value={modelNumber} />
        </View>
        <View style={{ gap: 8, paddingVertical: 16 }}>
          <Text
            style={{
              paddingHorizontal: 16,
              color: colors.textPrimary,
              ...typography.heading3,
            }}
          >
            写真
          </Text>
          {photoErrors.length > 0 && (
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.error,
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {photoErrors.map((error, i) => {
                  if (error) {
                    return (
                      <Text key={i} style={{ color: colors.error }}>
                        - {error?.message as string}
                      </Text>
                    );
                  }
                })}
              </View>
            </View>
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          >
            <TakePhoto name="front" isRequired label="正面" />
            <TakePhoto name="back" isRequired label="背面" />
            <TakePhoto name="left" isRequired label="左側" />
            <TakePhoto name="right" isRequired label="右側" />
            <TakePhoto name="interior" isRequired label="内装" />
            <TakePhoto name="other1" label="その他1" />
            <TakePhoto name="other2" label="その他2" />
            <TakePhoto name="other3" label="その他3" />
            <TakePhoto name="other4" label="その他4" />
            <TakePhoto name="other5" label="その他5" />
            <TakePhoto name="other6" label="その他6" />
          </ScrollView>
        </View>
        <ColorSelect />
        <View style={{ paddingHorizontal: 16 }}>
          <ModalPicker
            name="firstRegistrationYear"
            label="初年度登録年"
            options={registrationYearOptions}
            required
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <TextInput label="備考" name="description" multiline />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Button
            isLoading={isSubmitting}
            color={colors.primary}
            label="登録"
            onPress={onSubmit}
          />
        </View>
        <SafeAreaBottom />
      </ScrollView>
      <Modal visible={isSubmitting} transparent animationType="slide">
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
    </KeyboardAvoidingView>
  );
};

export default RegistrationCarForm;
