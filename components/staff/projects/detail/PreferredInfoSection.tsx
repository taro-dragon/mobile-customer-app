import React from "react";
import { Text, View } from "react-native";
import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import { useTheme } from "@/contexts/ThemeContext";
import dayjs from "dayjs";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import Alert from "@/components/common/Alert";

type Props = {
  preferredInfo: ExtendedProject["preferredInfo"];
};

const LATITUDE = 35.1709;
const LONGITUDE = 136.8816;

const PreferredInfoSection: React.FC<Props> = ({ preferredInfo }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ ...typography.title3, color: colors.textPrimary }}>
            希望日時
          </Text>
        </View>

        {preferredInfo?.preferredDates.map((dateField, index) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderColor: colors.borderPrimary,
              borderRadius: 8,
              padding: 12,
              gap: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 24,
              }}
            >
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textPrimary,
                }}
              >
                第{dateField.priority}希望
              </Text>
            </View>

            {/* 日時選択 */}
            <View
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{ color: colors.textPrimary, ...typography.body2 }}
                >
                  {dayjs(dateField.datetime.seconds * 1000).format(
                    "YYYY/MM/DD HH:mm"
                  )}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* 位置情報セクション */}
      <View style={{ gap: 12 }}>
        <Text style={{ ...typography.title3, color: colors.textPrimary }}>
          位置情報
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: colors.borderPrimary,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              provider={PROVIDER_DEFAULT}
              region={{
                latitude: preferredInfo?.location?.lat || LATITUDE,
                longitude: preferredInfo?.location?.lng || LONGITUDE,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: preferredInfo?.location?.lat || LATITUDE,
                  longitude: preferredInfo?.location?.lng || LONGITUDE,
                }}
              />
            </MapView>
          </View>
        </View>
      </View>
      {preferredInfo?.comment && (
        <Alert
          title="コメント"
          message={preferredInfo?.comment || ""}
          type="info"
        />
      )}
    </View>
  );
};

export default PreferredInfoSection;
