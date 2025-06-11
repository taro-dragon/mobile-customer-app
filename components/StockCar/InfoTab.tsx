import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { StockCar } from "@/hooks/staff/useFetchStockCar";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { colorOptions } from "../registrationCar/form/ColorSelect";
import {
  guaranteeExemptionOptions,
  guaranteeLimitOptions,
  guaranteeOptions,
  guaranteeRoadServiceOptions,
  repairStatusOptions,
} from "@/constants/registrationStockOptions";
import Alert from "../common/Alert";

type InfoTabProps = {
  stockCar: StockCar;
};

const InfoTab: React.FC<InfoTabProps> = ({ stockCar }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(stockCar as unknown as Car);
  const colorValue = useMemo(() => {
    return (
      colorOptions.find((option) => option.color === stockCar.color)?.bgColor ||
      ""
    );
  }, [stockCar.color]);
  const guaranteeValue = useMemo(() => {
    return (
      guaranteeOptions.find((option) => option.value === stockCar.guarantee)
        ?.label || ""
    );
  }, [stockCar.guarantee]);
  const repairStatusValue = useMemo(() => {
    return (
      repairStatusOptions.find(
        (option) => option.value === stockCar.repairStatus
      )?.label || ""
    );
  }, [stockCar.repairStatus]);
  const guaranteeLimitSelectValue = useMemo(() => {
    return (
      guaranteeLimitOptions.find(
        (option) => option.value === stockCar.guaranteeLimitSelect
      )?.label || ""
    );
  }, [stockCar.guaranteeLimitSelect]);
  const guaranteeExemptionSelectValue = useMemo(() => {
    return (
      guaranteeExemptionOptions.find(
        (option) => option.value === stockCar.guaranteeExemptionSelect
      )?.label || ""
    );
  }, [stockCar.guaranteeLimitSelect]);
  const guaranteeRoadServiceSelectValue = useMemo(() => {
    return (
      guaranteeRoadServiceOptions.find(
        (option) => option.value === stockCar.guaranteeRoadServiceSelect
      )?.label || ""
    );
  }, [stockCar.guaranteeLimitSelect]);
  return (
    <Tabs.ScrollView>
      <View style={{ padding: 16, gap: 16 }}>
        <Alert
          title="販売店からの車両説明"
          message={stockCar.description}
          type="info"
        />
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
            <CarInfoItem label="修復歴" value={repairStatusValue} />
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            保証情報
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
            {stockCar.guarantee === "guarantee" ? (
              <>
                <CarInfoItem label="保証有無" value={guaranteeValue} />
                {stockCar.guaranteePeriod && (
                  <CarInfoItem
                    label="保証期間"
                    value={`${stockCar.guaranteePeriod}ヶ月`}
                  />
                )}
                {stockCar.guaranteeDistance && (
                  <CarInfoItem
                    label="保証距離"
                    value={`${stockCar.guaranteeDistance?.toLocaleString()}km`}
                  />
                )}
                {stockCar.guaranteeContent && (
                  <CarInfoItem
                    label="保証説明"
                    value={stockCar.guaranteeContent}
                    multiline
                  />
                )}
                {stockCar.guaranteeCount && (
                  <CarInfoItem
                    label="保証回数上限"
                    value={`${stockCar.guaranteeCount}回`}
                  />
                )}
                {stockCar.guaranteeLimitSelect && (
                  <CarInfoItem
                    label="保証限度額の上限"
                    value={guaranteeLimitSelectValue}
                  />
                )}
                {stockCar.guaranteeLimit && (
                  <CarInfoItem
                    label="保証説明"
                    value={stockCar.guaranteeLimit}
                    multiline
                  />
                )}
              </>
            ) : (
              <CarInfoItem label="保証有無" value="保証なし" />
            )}
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            免責情報
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
            {stockCar.guarantee === "guarantee" ? (
              <>
                <CarInfoItem
                  label="免責金"
                  value={guaranteeExemptionSelectValue}
                />
                {stockCar.guaranteeExemption && (
                  <CarInfoItem
                    label="免責金説明"
                    value={stockCar.guaranteeExemption}
                    multiline
                  />
                )}
              </>
            ) : (
              <CarInfoItem label="保証有無" value="保証なし" />
            )}
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            ロードサービス情報
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
            {stockCar.guarantee === "guarantee" ? (
              <>
                <CarInfoItem
                  label="ロードサービス"
                  value={guaranteeRoadServiceSelectValue}
                />

                {stockCar.guaranteeRoadService && (
                  <CarInfoItem
                    label="ロードサービス説明"
                    value={stockCar.guaranteeRoadService}
                    multiline
                  />
                )}
              </>
            ) : (
              <CarInfoItem label="保証有無" value="保証なし" />
            )}
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};

export default InfoTab;
