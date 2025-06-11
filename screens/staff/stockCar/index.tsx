import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

import ImageCarousel from "@/components/common/ImageCarousel";
import { useTheme } from "@/contexts/ThemeContext";
import { StockCar } from "@/hooks/staff/useFetchStockCar";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import StoreTab from "@/components/StockCar/StoreTab";
import InfoTab from "@/components/StockCar/InfoTab";
import OptionTab from "@/components/StockCar/OptionTab";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";

type StockCarProps = {
  stockCar: StockCar;
  isCurrentStore: boolean;
};

const StockCarScreen: React.FC<StockCarProps> = ({
  stockCar,
  isCurrentStore,
}) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(stockCar as unknown as Car);
  console.log(stockCar.images);
  // 写真を指定した順序で配列にする
  const imageOrder = ["front", "back", "left", "right", "interior"] as const;
  const basicImages = imageOrder
    .map((key) => stockCar?.images?.[key])
    .filter((url): url is string => Boolean(url));

  // 追加写真（otherPhoto）を取得
  const additionalImages = Object.keys(stockCar?.images ?? {})
    .filter((key) => key.startsWith("otherPhoto"))
    .sort((a, b) => {
      // otherPhoto1, otherPhoto2, ... の順序でソート
      const aNum = parseInt(a.replace("otherPhoto", ""));
      const bNum = parseInt(b.replace("otherPhoto", ""));
      return aNum - bNum;
    })
    .map((key) => stockCar?.images?.[key as keyof typeof stockCar.images])
    .filter((url): url is string => Boolean(url));

  // 基本写真と追加写真を結合
  const carImages = [...basicImages, ...additionalImages];
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
  const CarHeader = useMemo(
    () => (
      <View pointerEvents="box-none">
        <ImageCarousel images={carImages} />
        <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
          <View style={{ alignItems: "flex-start", gap: 4 }}>
            <Text style={{ ...typography.heading3, color: colors.primary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 4,
                  padding: 2,
                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
              >
                <Text
                  style={{
                    ...typography.heading4,
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  支払総額
                  <Text style={{ ...typography.body4, color: colors.white }}>
                    （税込）
                  </Text>
                </Text>
              </View>
              <Text style={{ ...typography.title1, color: colors.primary }}>
                {(Number(stockCar.totalPayment) / 10000).toFixed(1)}
                <Text
                  style={{
                    ...typography.heading5,
                    color: colors.textSecondary,
                  }}
                >
                  万円
                </Text>
              </Text>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <View
                style={{
                  borderRadius: 4,
                  padding: 2,
                  borderWidth: 1,
                  borderColor: colors.textSecondary,
                }}
              >
                <Text
                  style={{
                    ...typography.heading4,
                    color: colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  本体価格
                  <Text
                    style={{
                      ...typography.body4,
                      color: colors.textSecondary,
                    }}
                  >
                    （税込）
                  </Text>
                </Text>
              </View>
              <Text style={{ ...typography.title1, color: colors.textPrimary }}>
                {(Number(stockCar.bodyPrice) / 10000).toFixed(1)}
                <Text
                  style={{
                    ...typography.heading5,
                    color: colors.textSecondary,
                  }}
                >
                  万円
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [carData, carImages]
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs.Container
          renderHeader={() => CarHeader}
          headerContainerStyle={{
            backgroundColor: colors.backgroundPrimary,
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: { height: 0, width: 0 },
            borderBottomWidth: 1,
            borderBottomColor: colors.gray200,
          }}
          renderTabBar={renderTabBar}
          lazy={true}
          containerStyle={{
            backgroundColor: colors.backgroundPrimary,
          }}
        >
          <Tabs.Tab name="車両情報">
            <InfoTab stockCar={stockCar} />
          </Tabs.Tab>
          <Tabs.Tab name="装備情報">
            <OptionTab stockCar={stockCar} />
          </Tabs.Tab>
          <Tabs.Tab name="店舗情報">
            <StoreTab store={stockCar.store} />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
      {isCurrentStore && (
        <>
          <Divider />
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              flexDirection: "row",
              gap: 16,
            }}
          >
            <View style={{ gap: 4 }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 4,
                  padding: 2,
                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
              >
                <Text
                  style={{
                    ...typography.heading4,
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  支払総額
                  <Text style={{ ...typography.body4, color: colors.white }}>
                    （税込）
                  </Text>
                </Text>
              </View>
              <Text style={{ ...typography.title1, color: colors.primary }}>
                {(Number(stockCar.totalPayment) / 10000).toFixed(1)}
                <Text
                  style={{
                    ...typography.heading5,
                    color: colors.textSecondary,
                  }}
                >
                  万円
                </Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                onPress={() => {
                  console.log("pressed");
                }}
                label="問い合わせる"
                color={colors.primary}
              />
            </View>
          </View>
          <SafeAreaBottom />
        </>
      )}
    </View>
  );
};

export default StockCarScreen;
