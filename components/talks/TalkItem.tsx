import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
import Divider from "../common/Divider";
import Tag from "../common/Tag";
import Logo from "../common/Logo";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";

// dayjsの設定
dayjs.extend(relativeTime);
dayjs.locale("ja");

type TalkItemProps = {
  talk: TalkWithAffiliate;
};

const TalkItem: React.FC<TalkItemProps> = ({ talk }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { label, color } = useMemo(
    () => getSourceTypeLabel(talk.sourceType),
    [talk.sourceType]
  );

  const handlePress = () => {
    router.push(`/talks/${talk.id}`);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        {talk.affiliateStore?.imageUrls ? (
          <Image
            source={{
              uri: talk.affiliateStore?.imageUrls[0],
            }}
            style={styles.avatar}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              marginRight: 12,
              backgroundColor: colors.backgroundSecondary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo width={24} color={colors.textSecondary} />
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[styles.name, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {talk.affiliateStore?.shopName || "不明な店舗"}
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
        <View style={{ alignItems: "center", gap: 8 }}>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
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
