import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
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
  talk: TalkWithUser;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};
const LocationItem: React.FC<LocationItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  if (!message.location) return null;
  const [assets] = useAssets(require("@/assets/images/pin.png"));
  const { colors, typography } = useTheme();
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const [region, setRegion] = useState<Region>({
    latitude: message.location.latitude,
    longitude: message.location.longitude,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  // アバター画像のURLを決定
  const getAvatarUrl = () => {
    if (message.senderType === "staff") {
      // スタッフのプロフィール画像は都度fetchするため、デフォルト画像を使用
      return ""; // デフォルト画像が表示される
    } else {
      return (
        talk.sourceCar?.images.front || talk.sourceStockCar?.images.front || ""
      ); // 車両画像
    }
  };

  // 送信者名を取得
  const getSenderName = () => {
    if (message.senderType === "staff") {
      if (isMe) {
        return "自分";
      } else {
        // talkオブジェクトからスタッフ情報を取得
        const staff = talk.staffs?.get(message.senderId);
        return staff ? staff.name : "不明なスタッフ";
      }
    } else {
      // talkオブジェクトからユーザー情報を取得
      return talk.user
        ? `${talk.user.familyName} ${talk.user.givenName}`
        : "不明なユーザー";
    }
  };

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
            uri: getAvatarUrl(),
          }}
          style={styles.avatar}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/map",
            params: {
              latitude: message.location?.latitude,
              longitude: message.location?.longitude,
              address: message.location?.address,
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
              {message.location.address}
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
              {dayjs(message.createdAt.toDate()).format("HH:mm")}
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
