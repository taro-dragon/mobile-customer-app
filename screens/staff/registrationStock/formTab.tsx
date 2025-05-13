import {
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import RegistrationStockBasicFormScreen from "./form/basic";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";

const renderScene = SceneMap({
  basic: RegistrationStockBasicFormScreen,
  price: RegistrationStockBasicFormScreen,
  guarantee: RegistrationStockBasicFormScreen,
  options: RegistrationStockBasicFormScreen,
});

const routes = [
  { key: "basic", title: "基本" },
  { key: "price", title: "販売" },
  { key: "guarantee", title: "保証" },
  { key: "options", title: "オプション" },
];

const RegistrationStockFormScreen = () => {
  const { colors, typography } = useTheme();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
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
                onPress={() => {}}
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
    </View>
  );
};

export default RegistrationStockFormScreen;
