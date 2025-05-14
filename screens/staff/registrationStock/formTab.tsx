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
import { useNavigation, useRouter } from "expo-router";

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

const RegistrationStockFormScreen = () => {
  const { colors, typography } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const { currentStore } = useStore();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const { watch } = useFormContext();
  const onDraft = async () => {
    setModalVisible(true);
    const formData = watch();
    try {
      await firestore()
        .collection("shops")
        .doc(currentStore?.id)
        .collection("stockDrafts")
        .add({
          createdAt: new Date(),
          updatedAt: new Date(),
          ...formData,
        });
      navigation.getParent()?.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setModalVisible(false);
    }
  };
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
                onPress={() => {}}
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
