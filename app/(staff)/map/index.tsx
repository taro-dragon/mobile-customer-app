import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { openMapWithLatlng } from "@/libs/openMapWithLatlng";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const { colors, typography } = useTheme();
  const { latitude, longitude, address } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
    address: string;
  }>();
  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        region={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}
          onPress={() => {
            openMapWithLatlng(
              { latitude: Number(latitude), longitude: Number(longitude) },
              address
            );
          }}
        />
      </MapView>
      <View
        style={{
          backgroundColor: colors.backgroundPrimary,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
          {address}
        </Text>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default Map;
