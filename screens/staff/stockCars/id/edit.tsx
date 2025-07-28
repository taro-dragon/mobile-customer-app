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

import RegistrationStockBasicFormScreen from "@/screens/staff/registrationStock/form/basic";
import RegistrationStockPriceFormScreen from "@/screens/staff/registrationStock/form/price";
import RegistrationStockGuaranteeFormScreen from "@/screens/staff/registrationStock/form/guarantee";
import RegistrationStockOptionsFormScreen from "@/screens/staff/registrationStock/form/options";

import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useStore } from "@/hooks/useStore";
import { useFormContext } from "react-hook-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { uploadStockImages } from "@/libs/uploadStockImages";
import Toast from "react-native-toast-message";
import { removeUndefined } from "@/libs/removeUndefined";
import RegistrationStockManagerFormScreen from "@/screens/staff/registrationStock/form/manager";
import { Stock } from "@/types/firestore_schema/stock";
import { useStockCarContext } from "@/contexts/staff/stockCars/StockCarContext";
import { useStockCarsContext } from "@/contexts/staff/stockCars/StockCarsContext";

const routes = [
  { key: "basic", title: "基本" },
  { key: "price", title: "販売" },
  { key: "guarantee", title: "保証" },
  { key: "options", title: "オプション" },
  { key: "manager", title: "担当者" },
];

type StockCarEditScreenProps = {
  stock: Stock;
};

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

const RegistrationStockFormScreen: React.FC<StockCarEditScreenProps> = ({
  stock,
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate } = useStockCarContext();
  const { archivedStockCarsMutate, publishedStockCarsMutate } =
    useStockCarsContext();
  const { colors, typography } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const { currentStore } = useStore();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const {
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
      const stockCarRef = firestore().collection("stockCars").doc(id);
      const imageFields = collectImageFields(data);
      const existingImages = stock?.images || {};
      const imageUrls = await uploadStockImages(
        stockCarRef.id,
        imageFields,
        existingImages
      );
      const stockData = { ...data };
      Object.keys(stockData).forEach((key) => {
        if (
          REQUIRED_IMAGE_FIELDS.includes(key) ||
          key.startsWith(ADDITIONAL_PHOTO_BASE)
        ) {
          delete stockData[key];
        }
      });
      const cleanStockData = removeUndefined(stockData);
      await stockCarRef.update({
        ...cleanStockData,
        images: imageUrls,
        prefecture: currentStore.address1,
        updatedAt: firestore.Timestamp.now(),
      });
      mutate();
      archivedStockCarsMutate();
      publishedStockCarsMutate();
      router.back();
      Toast.show({
        type: "success",
        text1: "在庫情報を更新しました",
      });
    } catch (error) {
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
                color={colors.primary}
                label="情報更新"
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
