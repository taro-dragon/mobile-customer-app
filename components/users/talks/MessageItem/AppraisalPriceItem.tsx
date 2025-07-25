import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { DollarSign } from "lucide-react-native";
import firestore from "@react-native-firebase/firestore";

import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import { Message } from "@/types/firestore_schema/messages";
import Toast from "react-native-toast-message";

type AppraisalPriceItemProps = {
  talk: TalkWithAffiliate;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};
const AppraisalPriceItem: React.FC<AppraisalPriceItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const { colors, typography } = useTheme();
  const [opening, setOpening] = useState(false);
  const openAppraisalPrice = async () => {
    try {
      setOpening(true);
      await firestore()
        .collection("talks")
        .doc(talk.id)
        .update({
          appraisal: {
            ...talk.appraisal,
            isOpened: true,
          },
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "エラーが発生しました",
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
    } finally {
      setOpening(false);
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
            uri:
              talk.sourceCar?.images.front || talk.sourceStockCar?.images.front,
          }}
          style={styles.avatar}
        />
      )}
      <View
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
        <View
          style={[
            styles.calendarWrapper,
            { backgroundColor: colors.textWarning },
          ]}
        >
          <DollarSign size={36} color={colors.white} />
        </View>
        <View style={styles.messageAreaWrapper}>
          <View style={styles.messageWrapper}>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              査定金額
            </Text>
            {message.appraisalPriceNote && (
              <Text style={{ color: colors.textPrimary, ...typography.body3 }}>
                {message.appraisalPriceNote}
              </Text>
            )}
          </View>

          {talk.appraisal?.isOpened ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.textPrimary,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                ¥{Number(talk.appraisal?.appraisalPrice).toLocaleString()}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              disabled={opening}
              style={{
                borderWidth: 1,
                borderColor: colors.borderSuccess,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.backgroundSuccess,
              }}
              onPress={openAppraisalPrice}
            >
              {opening ? (
                <ActivityIndicator size="small" color={colors.textSuccess} />
              ) : (
                <Text
                  style={{ color: colors.textSuccess, ...typography.heading3 }}
                >
                  確認する
                </Text>
              )}
            </TouchableOpacity>
          )}

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
      </View>
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
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
  },
  calendarWrapper: {
    padding: 12,
    width: "100%",
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
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

export default AppraisalPriceItem;
