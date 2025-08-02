import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import dayjs from "dayjs";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DollarSign } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";

type LocationItemProps = {
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
  senderName: string;
  avatarUrl?: string;
  readCount: number;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
};
const LocationItem: React.FC<LocationItemProps> = ({
  isMe,
  bubbleColor,
  senderName,
  avatarUrl,
  readCount,
  createdAt,
  location,
}) => {
  const [assets] = useAssets(require("@/assets/images/pin.png"));
  const { colors, typography } = useTheme();
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const [region] = useState<Region>({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {!isMe && (
        <Image
          source={{
            uri: avatarUrl,
          }}
          style={styles.avatar}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/map",
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
              address: location.address,
            },
          });
        }}
        style={[
          styles.bubble,
          isMe ? styles.userBubble : styles.otherBubble,
          {
            backgroundColor: bubbleColor.backgroundColor,
            borderColor: bubbleColor.borderColor,
            borderWidth: 1,
          },
        ]}
      >
        <View style={[styles.mapWrapper]} pointerEvents="none">
          <MapView
            ref={mapRef}
            style={{
              width: "100%",
              height: "100%",
            }}
            provider={PROVIDER_DEFAULT}
            region={region}
          />
          <View pointerEvents="none" style={styles.centerPin}>
            <Image
              source={assets?.[0] as ImageSourcePropType}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.messageAreaWrapper}>
          <View style={styles.messageWrapper}>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              位置情報
            </Text>
            <Text style={{ color: colors.textSecondary, ...typography.body3 }}>
              {location.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  bubble: {
    width: "60%",
    borderRadius: 18,
    overflow: "hidden",
  },
  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -24,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
  },
  mapWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: "relative",
  },
  messageWrapper: {
    gap: 4,
  },
  messageAreaWrapper: {
    padding: 12,
    gap: 12,
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

export default LocationItem;
