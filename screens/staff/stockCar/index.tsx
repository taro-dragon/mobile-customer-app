import React, { useCallback, useMemo } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import ImageCarousel from "@/components/common/ImageCarousel";
import { colorOptions } from "@/components/registrationCar/form/ColorSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { StockCar } from "@/hooks/staff/useFetchStockCar";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import StoreTab from "@/components/StockCar/StoreTab";

type StockCarProps = {
  stockCar: StockCar;
};

const StockCarScreen: React.FC<StockCarProps> = ({ stockCar }) => {
  const { colors, typography } = useTheme();
  const windowHeight = useWindowDimensions().height;
  const carData = transformCarData(stockCar as unknown as Car);
  const carImages = Object.values(stockCar?.images ?? {});
  const colorValue = colorOptions.find(
    (option) => option.color === stockCar.color
  )?.bgColor;
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
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
              車両情報
            </Text>
            <View
              style={{
                gap: 8,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                padding: 12,
                borderRadius: 12,
              }}
            >
              <CarInfoItem label="年式" value={carData.year.year} />
              <CarInfoItem label="グレード" value={carData.grade.gradeName} />
              {stockCar?.modelNumber && (
                <CarInfoItem label="型番" value={stockCar.modelNumber} />
              )}
              <CarInfoItem
                label="走行距離"
                value={`${stockCar.mileage.toLocaleString()}km`}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...typography.heading3,
                    color: colors.textSecondary,
                  }}
                >
                  車体色
                </Text>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: colorValue,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.borderPrimary,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
    [carData, carImages]
  );
  return (
    <View style={{ flex: 1 }}>
      <Tabs.Container
        revealHeaderOnScroll
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
          <Tabs.ScrollView>
            <View>
              <Text>車両情報</Text>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="オプション">
          <Tabs.ScrollView>
            <View>
              <Text>車両情報</Text>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="店舗情報">
          <StoreTab store={stockCar.store} />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default StockCarScreen;
