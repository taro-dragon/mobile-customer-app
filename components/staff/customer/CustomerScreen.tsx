import { useTheme } from "@/contexts/ThemeContext";
import { User } from "@/types/firestore_schema/users";
import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type CustomerScreenProps = {
  customer: User;
};

const CustomerScreen: React.FC<CustomerScreenProps> = ({ customer }) => {
  const { colors, typography } = useTheme();
  const CustomerContent = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => {
    return (
      <View>
        <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
          {label}
        </Text>
        <Text style={{ ...typography.body1, color: colors.textSecondary }}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <CustomerContent
        label="氏名"
        value={`${customer.familyName} ${customer.givenName}`}
      />
      <CustomerContent
        label="郵便番号"
        value={customer.postalCode || "未設定"}
      />
      <CustomerContent
        label="住所"
        value={`${customer.address1} ${customer.address2} ${customer.address3}`}
      />
      {customer.lat && customer.lng && (
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
            該当地図
          </Text>
          <View
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              borderRadius: 12,
              overflow: "hidden",
            }}
            pointerEvents="auto"
          >
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: customer.lat,
                longitude: customer.lng,
                latitudeDelta: 0.0082,
                longitudeDelta: 0.0082,
              }}
              scrollEnabled={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomerScreen;
