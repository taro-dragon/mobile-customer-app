import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { CarIcon, ChevronRight, File, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TalkHeaderProps = {
  talk: TalkWithUser;
};

const TalkHeader: React.FC<TalkHeaderProps> = ({ talk }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(
    talk.sourceType === "car_inquiry"
      ? (talk.sourceStockCar as unknown as Car)
      : (talk.sourceCar as Car)
  );
  console.log("carData", carData);
  const router = useRouter();
  const onCarInfoPress = () => {
    if (talk.sourceType === "car_inquiry") {
      router.push(`/stockCar/${talk.sourceId}`);
    } else {
      router.push(`/bulkAppraisalCars/${talk.carId}`);
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={onCarInfoPress}
        style={{
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={{
              uri:
                talk.sourceCar?.images.front ||
                talk.sourceStockCar?.images.front,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.borderPrimary,
            }}
          />
          <View>
            <Text style={{ ...typography.title4, color: colors.textPrimary }}>
              {carData.maker.name} {carData.model.name}
            </Text>
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {carData.year.year}
            </Text>
          </View>
        </View>
        <ChevronRight size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Divider />
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
