import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useRouter } from "expo-router";
import { Car, File, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TalkHeaderProps = {
  talk: TalkWithUser;
};

const TalkHeader: React.FC<TalkHeaderProps> = ({ talk }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const onCarInfoPress = () => {
    if (talk.sourceType === "car_inquiry") {
      router.push(`/stockCar/${talk.sourceId}`);
    } else {
      router.push(`/cars/${talk.carId}`);
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/customer/${talk.userId}`)}
          style={[styles.headerMenu]}
        >
          <User size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            顧客情報
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: colors.borderPrimary,
          }}
        />
        <TouchableOpacity onPress={onCarInfoPress} style={[styles.headerMenu]}>
          <Car size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            {talk.sourceType === "car_inquiry" ? "問い合わせ車両" : "車両情報"}
          </Text>
        </TouchableOpacity>
        {talk.sourceType !== "car_inquiry" && (
          <>
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: colors.borderPrimary,
              }}
            />
            <TouchableOpacity
              onPress={() =>
                router.push(
                  talk.sourceType === "buyOffer"
                    ? `/offers/${talk.sourceId}`
                    : `/bids/${talk.sourceId}`
                )
              }
              style={styles.headerMenu}
            >
              <File size={24} color={colors.textPrimary} />
              <Text style={{ ...typography.title5, color: colors.textPrimary }}>
                {talk.sourceType === "buyOffer"
                  ? "オファー情報"
                  : "一括査定情報"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messagesContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TalkHeader;
