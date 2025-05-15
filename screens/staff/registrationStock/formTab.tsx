import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import firestore from "@react-native-firebase/firestore";

import RegistrationStockBasicFormScreen from "./form/basic";
import RegistrationStockPriceFormScreen from "./form/price";
import RegistrationStockGuaranteeFormScreen from "./form/guarantee";
import RegistrationStockOptionsFormScreen from "./form/options";

import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useStore } from "@/hooks/useStore";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "expo-router";
import { Alert } from "react-native";
import { registrationStockDraftSchema } from "@/constants/schemas/registrationStockSchema";
import { uploadStockImages } from "@/libs/uploadStockImages";
import Toast from "react-native-toast-message";
import { removeUndefined } from "@/libs/removeUndefined";

const renderScene = SceneMap({
  basic: RegistrationStockBasicFormScreen,
  price: RegistrationStockPriceFormScreen,
  guarantee: RegistrationStockGuaranteeFormScreen,
  options: RegistrationStockOptionsFormScreen,
});

const routes = [
  { key: "basic", title: "基本" },
  { key: "price", title: "販売" },
  { key: "guarantee", title: "保証" },
  { key: "options", title: "オプション" },
];

const IMAGE_FIELDS = [
  "front",
  "back",
  "left",
  "right",
  "interior",
  ...Array.from({ length: 15 }, (_, i) => `otherPhoto${i + 1}`),
];

const RegistrationStockFormScreen = () => {
  const { colors, typography } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const { currentStore } = useStore();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  // Handle draft saving (no validation, no images)
  const onHandleDraft = async () => {
    try {
      setModalVisible(true);
      // Get all form data
      const formData = watch();

      // Create a copy without image fields to save storage costs
      const draftData = { ...formData };
      IMAGE_FIELDS.forEach((field) => {
        if (field in draftData) {
          delete draftData[field];
        }
      });

      // Remove undefined values to prevent Firestore error
      const cleanDraftData = removeUndefined(draftData);

      // Validate with the draft schema (accepts all fields without validation)
      const validationResult =
        registrationStockDraftSchema.safeParse(cleanDraftData);
      if (!validationResult.success) {
        console.error("Draft validation failed:", validationResult.error);
        return;
      }

      // Save to Firestore
      await firestore()
        .collection("shops")
        .doc(currentStore?.id)
        .collection("stockDrafts")
        .add({
          createdAt: new Date(),
          updatedAt: new Date(),
          ...cleanDraftData,
        });

      // Navigate back
      navigation.getParent()?.goBack();
      Toast.show({
        type: "success",
        text1: "下書き保存しました",
      });
    } catch (error) {
      console.error("Draft saving error:", error);
      Toast.show({
        type: "error",
        text1: "下書き保存に失敗しました",
      });
    } finally {
      setModalVisible(false);
    }
  };

  // Confirm draft saving
  const onDraft = () => {
    Alert.alert("下書き保存", "下書き保存では画像は保存されません。", [
      {
        text: "キャンセル",
        onPress: () => {},
        style: "destructive",
      },
      { text: "保存", onPress: onHandleDraft, style: "default" },
    ]);
  };

  // Handle complete stock registration (with validation and images)
  const onRegisterStock = handleSubmit(async (data) => {
    if (!currentStore?.id) {
      Toast.show({
        type: "error",
        text1: "店舗情報の取得に失敗しました",
      });
      return;
    }

    try {
      setModalVisible(true);

      // Create a new stock document with an auto-generated ID
      const stockCarRef = firestore().collection("stockCars").doc();

      // Collect all image fields
      const imageFields: Record<string, string | undefined> = {};
      IMAGE_FIELDS.forEach((field) => {
        if (data[field]) {
          imageFields[field] = data[field];
        }
      });

      // Upload images to Firebase Storage and get download URLs
      const imageUrls = await uploadStockImages(
        stockCarRef.id,
        currentStore.id,
        imageFields
      );

      // Create stock data without image URIs (we'll add the download URLs instead)
      const stockData = { ...data };
      // Remove local image URIs
      IMAGE_FIELDS.forEach((field) => {
        if (field in stockData) {
          delete stockData[field];
        }
      });

      // Remove undefined values to prevent Firestore error
      const cleanStockData = removeUndefined(stockData);

      // Save to Firestore with metadata and image download URLs
      await stockCarRef.set({
        storeId: currentStore.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        images: imageUrls,
        ...cleanStockData,
        bodyPrice: Number(cleanStockData.bodyPrice),
        totalPayment: Number(cleanStockData.totalPayment),
        mileage: Number(cleanStockData.mileage),
        displacement: Number(cleanStockData.displacement),
        doorNumber: Number(cleanStockData.doorNumber),
      });

      // Navigate back
      navigation.getParent()?.goBack();
      Toast.show({
        type: "success",
        text1: "在庫登録が完了しました",
      });
    } catch (error) {
      console.error("Stock registration error:", error);
      Toast.show({
        type: "error",
        text1: "在庫登録に失敗しました",
      });
    } finally {
      setModalVisible(false);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            swipeEnabled={true}
            commonOptions={{ labelStyle: { ...typography.heading4 } }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: colors.primary }}
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  borderBottomColor: colors.borderPrimary,
                  borderBottomWidth: 1,
                }}
                activeColor={colors.primary}
                inactiveColor={colors.textSecondary}
              />
            )}
          />
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Button
                isBorder
                color={colors.primary}
                label="下書き保存"
                onPress={onDraft}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                color={colors.primary}
                label="在庫登録"
                onPress={onRegisterStock}
              />
            </View>
          </View>
          <SafeAreaBottom />
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000060",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={{ ...typography.heading2, color: colors.white }}>
            送信中...
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default RegistrationStockFormScreen;
