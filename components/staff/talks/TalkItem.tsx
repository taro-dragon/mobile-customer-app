import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import Tag from "@/components/common/Tag";
import Divider from "@/components/common/Divider";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";

// dayjsの設定
dayjs.extend(relativeTime);
dayjs.locale("ja");

type TalkItemProps = {
  talk: TalkWithUser;
};

const TalkItem: React.FC<TalkItemProps> = ({ talk }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { label, color } = getSourceTypeLabel(talk.sourceType);
  const carData = transformCarData(
    talk.sourceType === "car_inquiry"
      ? (talk.sourceStockCar as unknown as Car)
      : (talk.sourceCar as Car)
  );
  const handlePress = () => {
    router.push(`/talks/${talk.id}`);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image
          source={{
            uri:
              talk?.sourceCar?.images.front ||
              talk?.sourceStockCar?.images.front,
          }}
          style={styles.avatar}
        />
        <View style={[styles.content, { gap: 4 }]}>
          <View>
            <Text
              style={[
                styles.name,
                { color: colors.textPrimary, ...typography.title3 },
              ]}
              numberOfLines={1}
            >
              {`${carData.maker.name} ${carData.model.name}`}
            </Text>
          </View>
          <View>
            <Text
              style={[styles.name, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {`${talk.user.familyName} ${talk.user.givenName}`}
            </Text>
          </View>
          <View style={styles.messageRow}>
            <Text
              style={[styles.message, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {talk.lastMessage}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: 8 }}>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {dayjs(talk.lastMessageAt.toDate()).fromNow()}
          </Text>
          <Tag label={label} color={color} />
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    fontSize: 14,
    flex: 1,
    marginRight: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3897f0",
  },
});

export default TalkItem;
