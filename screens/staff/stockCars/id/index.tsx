import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import StockCarHeader from "@/components/staff/stockCar/CarHeader";
import { useTheme } from "@/contexts/ThemeContext";
import { Stock } from "@/types/firestore_schema/stock";
import React, { useCallback } from "react";
import { Alert, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import InfoTab from "./tabs/InfoTab";
import OptionTab from "./tabs/OptionTab";
import ManagerTab from "./tabs/ManagerTab";
import { useRouter } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";
import { useStockCarContext } from "@/contexts/staff/stockCars/StockCarContext";
import { useStockCarsContext } from "@/contexts/staff/stockCars/StockCarsContext";

type StockCarDetailScreenProps = {
  stock: Stock;
};

const StockCarDetailScreen: React.FC<StockCarDetailScreenProps> = ({
  stock,
}) => {
  const { colors, typography } = useTheme();
  const { mutate } = useStockCarContext();
  const { archivedStockCarsMutate, publishedStockCarsMutate } =
    useStockCarsContext();
  const { staff } = useStore();
  const router = useRouter();
  const archiveStockCar = async () => {
    await firestore().collection("stockCars").doc(stock.id).update({
      status: "archived",
      updatedAt: firestore.Timestamp.now(),
      updatedBy: staff?.id,
    });
    mutate();
    archivedStockCarsMutate();
    publishedStockCarsMutate();
    router.back();
  };
  const onConfirm = () => {
    Alert.alert("公開終了", "公開終了しますか？", [
      { text: "キャンセル", style: "cancel" },
      { text: "公開終了", onPress: archiveStockCar },
    ]);
  };
  const renderTabBar = useCallback(
    (props: any) => (
      <MaterialTabBar
        {...props}
        activeColor={colors.primary}
        inactiveColor={colors.textSecondary}
        indicatorStyle={{
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 3,
        }}
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
        labelStyle={typography.heading3}
      />
    ),
    [colors, typography]
  );

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={() => <StockCarHeader stock={stock} />}
        headerContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { height: 0, width: 0 },
          borderBottomWidth: 1,
          borderBottomColor: colors.gray200,
        }}
        renderTabBar={renderTabBar}
        containerStyle={{
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <Tabs.Tab name="車両情報">
          <InfoTab stock={stock} />
        </Tabs.Tab>
        <Tabs.Tab name="装備情報">
          <OptionTab stock={stock} />
        </Tabs.Tab>
        <Tabs.Tab name="担当者">
          <ManagerTab stock={stock} />
        </Tabs.Tab>
      </Tabs.Container>
      <Divider />
      <View
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <View
          style={{
            padding: 16,
            gap: 8,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              label="編集"
              isBorder
              onPress={() => {
                router.push(`/stockCars/${stock.id}/edit`);
              }}
              color={colors.textSuccess}
              icon="Pencil"
            />
          </View>
          {stock.status === "published" && (
            <View style={{ flex: 1 }}>
              <Button
                label="公開終了"
                onPress={onConfirm}
                color={colors.textError}
                icon="X"
              />
            </View>
          )}
        </View>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default StockCarDetailScreen;
