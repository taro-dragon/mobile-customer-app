import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight, File, User } from "lucide-react-native";
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
  const router = useRouter();
  const onCarInfoPress = () => {
    if (talk.sourceType === "car_inquiry") {
      router.push(`/stockCar/${talk.sourceId}`);
    } else if (talk.sourceType === "buy_offer") {
      router.push(`/bulkAppraisalCars/${talk.sourceCarId}`);
    } else {
      router.push(`/bulkAppraisalCars/${talk.carId}`);
    }
  };
  return (
    <View>
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
                  talk.sourceType === "buy_offer"
                    ? `/offers/${talk.sourceId}`
                    : `/bids/${talk.sourceId}`
                )
              }
              style={styles.headerMenu}
            >
              <File size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </>
        )}
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: colors.borderPrimary,
          }}
        />
        <TouchableOpacity
          onPress={onCarInfoPress}
          style={{
            padding: 8,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.backgroundPrimary,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              flex: 1,
            }}
          >
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
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...typography.title4,
                  color: colors.textPrimary,
                  flex: 1,
                }}
              >
                {carData.maker.name} {carData.model.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...typography.body2, color: colors.textSecondary }}
              >
                {carData.year.year}
              </Text>
            </View>
          </View>
          <ChevronRight size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    aspectRatio: 1,
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
