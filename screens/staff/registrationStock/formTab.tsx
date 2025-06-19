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
import RegistrationStockManagerFormScreen from "./form/manager";

const routes = [
  { key: "basic", title: "基本" },
  { key: "price", title: "販売" },
  { key: "guarantee", title: "保証" },
  { key: "options", title: "オプション" },
  { key: "manager", title: "担当者" },
];

const renderScene = SceneMap({
  basic: RegistrationStockBasicFormScreen,
  price: RegistrationStockPriceFormScreen,
  guarantee: RegistrationStockGuaranteeFormScreen,
  options: RegistrationStockOptionsFormScreen,
  manager: RegistrationStockManagerFormScreen,
});

// 必須の画像フィールド
const REQUIRED_IMAGE_FIELDS = ["front", "back", "left", "right", "interior"];

// 追加可能な画像フィールドのベース名
const ADDITIONAL_PHOTO_BASE = "otherPhoto";

const RegistrationStockFormScreen: React.FC = () => {
  const { colors, typography } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const { currentStore, staff } = useStore();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const collectImageFields = (
    data: Record<string, any>
  ): Record<string, string> => {
    const imageFields: Record<string, string> = {};

    // 必須の画像を追加
    REQUIRED_IMAGE_FIELDS.forEach((field) => {
      if (data[field]) {
        imageFields[field] = data[field];
      }
    });

    // 追加画像を検索して追加
    Object.keys(data).forEach((key) => {
      if (key.startsWith(ADDITIONAL_PHOTO_BASE) && data[key]) {
        imageFields[key] = data[key];
      }
    });

    return imageFields;
  };

  // Handle draft saving (no validation, no images)
  const onHandleDraft = async () => {
    try {
      setModalVisible(true);
      // Get all form data
      const formData = watch();

      // Create a copy without image fields to save storage costs
      const draftData = { ...formData };

      // 画像フィールドを削除
      Object.keys(draftData).forEach((key) => {
        if (
          REQUIRED_IMAGE_FIELDS.includes(key) ||
          key.startsWith(ADDITIONAL_PHOTO_BASE)
        ) {
          delete draftData[key];
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
          createStaff: staff?.id,
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
        text2: error instanceof Error ? error.message : "不明なエラー",
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
      // Create a new stock document with an auto-generated ID
      const stockCarRef = firestore().collection("stockCars").doc();

      // 全ての画像フィールドを収集
      const imageFields = collectImageFields(data);

      // Upload images to Firebase Storage and get download URLs
      const imageUrls = await uploadStockImages(stockCarRef.id, imageFields);

      // Create stock data without image URIs (we'll add the download URLs instead)
      const stockData = { ...data };

      // 画像フィールドを削除
      Object.keys(stockData).forEach((key) => {
        if (
          REQUIRED_IMAGE_FIELDS.includes(key) ||
          key.startsWith(ADDITIONAL_PHOTO_BASE)
        ) {
          delete stockData[key];
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
        prefecture: currentStore.address1,
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
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
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
                tabStyle={{
                  width: "auto",
                  paddingHorizontal: 20,
                }}
                scrollEnabled={true}
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
                disabled={isModalVisible || isSubmitting}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                color={colors.primary}
                label="在庫登録"
                onPress={onRegisterStock}
                disabled={isModalVisible || isSubmitting}
              />
            </View>
          </View>
          <SafeAreaBottom />
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={isModalVisible || isSubmitting}
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
