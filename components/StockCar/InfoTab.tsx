import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { StockCar } from "@/hooks/staff/useFetchStockCar";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { colorOptions } from "../registrationCar/form/ColorSelect";

type InfoTabProps = {
  stockCar: StockCar;
};

const InfoTab: React.FC<InfoTabProps> = ({ stockCar }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(stockCar as unknown as Car);
  const colorValue = colorOptions.find(
    (option) => option.color === stockCar.color
  )?.bgColor;
  return (
    <Tabs.ScrollView>
      <View style={{ padding: 16 }}>
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
            <CarInfoItem label="モデル" value={carData.year.year} />
            <CarInfoItem label="グレード" value={carData.grade.gradeName} />
            {stockCar?.modelNumber && (
              <CarInfoItem label="型番" value={stockCar.modelNumber} />
            )}
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};

export default InfoTab;
