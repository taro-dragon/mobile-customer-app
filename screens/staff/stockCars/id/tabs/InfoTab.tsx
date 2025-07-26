import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { colorOptions } from "@/components/registrationCar/form/ColorSelect";
import {
  guaranteeExemptionOptions,
  guaranteeLimitOptions,
  guaranteeOptions,
  guaranteeRoadServiceOptions,
  repairStatusOptions,
  transmissionOptions,
} from "@/constants/registrationStockOptions";
import Alert from "@/components/common/Alert";
import createRegistrationYear from "@/libs/createRegistrationYear";
import { Stock } from "@/types/firestore_schema/stock";

type InfoTabProps = {
  stock: Stock;
};

const InfoTab: React.FC<InfoTabProps> = ({ stock }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(stock as unknown as Car);
  const colorValue = useMemo(() => {
    return (
      colorOptions.find((option) => option.color === stock.color)?.bgColor || ""
    );
  }, [stock.color]);
  const guaranteeValue = useMemo(() => {
    return (
      guaranteeOptions.find((option) => option.value === stock.guarantee)
        ?.label || ""
    );
  }, [stock.guarantee]);
  const repairStatusValue = useMemo(() => {
    return (
      repairStatusOptions.find((option) => option.value === stock.repairStatus)
        ?.label || ""
    );
  }, [stock.repairStatus]);
  const guaranteeLimitSelectValue = useMemo(() => {
    return (
      guaranteeLimitOptions.find(
        (option) => option.value === stock.guaranteeLimitSelect
      )?.label || ""
    );
  }, [stock.guaranteeLimitSelect]);
  const guaranteeExemptionSelectValue = useMemo(() => {
    return (
      guaranteeExemptionOptions.find(
        (option) => option.value === stock.guaranteeExemptionSelect
      )?.label || ""
    );
  }, [stock.guaranteeLimitSelect]);
  const guaranteeRoadServiceSelectValue = useMemo(() => {
    return (
      guaranteeRoadServiceOptions.find(
        (option) => option.value === stock.guaranteeRoadServiceSelect
      )?.label || ""
    );
  }, [stock.guaranteeLimitSelect]);
  const transmissionOptionsValue = useMemo(() => {
    return (
      transmissionOptions.find((option) => option.value === stock.transmission)
        ?.label || ""
    );
  }, [stock.transmission]);
  const firstRegistrationYearValue = useMemo(() => {
    const firstRegistrationYearOptions = [
      {
        label: "不明",
        value: "not_specified",
      },
      ...createRegistrationYear(),
    ];
    return (
      firstRegistrationYearOptions.find(
        (option) => option.value === stock.firstRegistrationYear
      )?.label || ""
    );
  }, [stock.firstRegistrationYear]);
  return (
    <Tabs.ScrollView>
      <View style={{ padding: 16, gap: 16 }}>
        <Alert title="車両説明" message={stock.description} type="info" />
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
            {stock.firstRegistrationYear && (
              <CarInfoItem
                label="初年度登録年"
                value={firstRegistrationYearValue}
              />
            )}
            <CarInfoItem
              label="走行距離"
              value={`${stock.mileage.toLocaleString()}km`}
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
            {stock?.modelNumber && (
              <CarInfoItem label="型番" value={stock.modelNumber} />
            )}
            {stock.displacement && (
              <CarInfoItem
                label="排気量"
                value={`${Number(stock.displacement).toLocaleString()}cc`}
              />
            )}
            <CarInfoItem label="修復歴" value={repairStatusValue} />
            {stock.doorNumber && (
              <CarInfoItem label="ドア数" value={stock.doorNumber} />
            )}
            {stock.fuelType && (
              <CarInfoItem label="ガソリン" value={stock.fuelType} />
            )}
            {stock.transmission && (
              <CarInfoItem
                label="ミッション"
                value={transmissionOptionsValue}
              />
            )}
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
            {stock.guarantee === "guarantee" ? (
              <>
                <CarInfoItem label="保証有無" value={guaranteeValue} />
                {stock.guaranteePeriod && (
                  <CarInfoItem
                    label="保証期間"
                    value={`${stock.guaranteePeriod}ヶ月`}
                  />
                )}
                {stock.guaranteeDistance && (
                  <CarInfoItem
                    label="保証距離"
                    value={`${stock.guaranteeDistance?.toLocaleString()}km`}
                  />
                )}
                {stock.guaranteeContent && (
                  <CarInfoItem
                    label="保証説明"
                    value={stock.guaranteeContent}
                    multiline
                  />
                )}
                {stock.guaranteeCount && (
                  <CarInfoItem
                    label="保証回数上限"
                    value={`${stock.guaranteeCount}回`}
                  />
                )}
                {stock.guaranteeLimitSelect && (
                  <CarInfoItem
                    label="保証限度額の上限"
                    value={guaranteeLimitSelectValue}
                  />
                )}
                {stock.guaranteeLimit && (
                  <CarInfoItem
                    label="保証説明"
                    value={stock.guaranteeLimit}
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
            {stock.guarantee === "guarantee" ? (
              <>
                <CarInfoItem
                  label="免責金"
                  value={guaranteeExemptionSelectValue}
                />
                {stock.guaranteeExemption && (
                  <CarInfoItem
                    label="免責金説明"
                    value={stock.guaranteeExemption}
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
            {stock.guarantee === "guarantee" ? (
              <>
                <CarInfoItem
                  label="ロードサービス"
                  value={guaranteeRoadServiceSelectValue}
                />

                {stock.guaranteeRoadService && (
                  <CarInfoItem
                    label="ロードサービス説明"
                    value={stock.guaranteeRoadService}
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
