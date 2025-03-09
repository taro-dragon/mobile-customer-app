import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";

type TalkItemProps = {
  talk: TalkWithAffiliate;
};

const TalkItem: React.FC<TalkItemProps> = ({ talk }) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: colors.backgroundPrimary,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View
        style={{ flexDirection: "row", gap: 12, alignItems: "center", flex: 1 }}
      >
        <Image
          source={{ uri: talk.affiliateStore.imageUrls[0] }}
          style={{ width: 56, height: 56, borderRadius: 20 }}
        />
        <View
          style={{
            gap: 4,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: colors.textPrimary, ...typography.heading3 }}
          >
            {talk.affiliateStore.shopName}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: colors.textSecondary, ...typography.body3 }}
          >
            {talk.lastMessage}
          </Text>
        </View>
      </View>
      <Text style={{ color: colors.textSecondary, ...typography.body3 }}>
        {dayjs(talk.lastMessageAt.toDate()).format("YYYY/MM/DD")}
      </Text>
    </View>
  );
};

export default TalkItem;
