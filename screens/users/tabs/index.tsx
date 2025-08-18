import React from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import { useRouter } from "expo-router";
import { Bell, CarIcon, ShoppingCart, Tag } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Car } from "@/types/models/Car";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import CurrentAppraisalCarsList from "@/components/CurrentAppraisalCarsList/CurrentAppraisalCarsList";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopHeader from "@/components/base/TopHeader";
import { useStore } from "@/hooks/useStore";

type UserIndexScreenProps = {
  currentAppraisalCars: Car[];
  currentAppraisalRequests: BulkAppraisalRequest[];
};

const UserIndexScreen: React.FC<UserIndexScreenProps> = ({
  currentAppraisalCars,
  currentAppraisalRequests,
}) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { user } = useStore();
  const guard = useRegistrationGuard();
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
    },
  });
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        paddingTop: headerHeight + top,
      }}
    >
      <TopHeader>
        <View style={{ gap: 24 }}>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Bell size={24} color={colors.white} />
          </View>
          <View
            style={{
              gap: 8,
            }}
          >
            <Text style={{ color: colors.white, ...typography.heading3 }}>
              {user?.isAnonymous ? "初めまして" : "こんにちは"}
            </Text>
            <Text style={{ color: colors.white, ...typography.title2 }}>
              {user?.familyName && user?.givenName
                ? `${user.familyName} ${user.givenName}さん`
                : "ユーザーさん"}
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={guard(() => {
                  router.push("/(user)/(tabs)/sell");
                })}
              >
                <Tag size={24} color={colors.primary} />
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  クルマを売る
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={guard(() => {
                  router.push("/(user)/(tabs)/search");
                })}
              >
                <ShoppingCart size={24} color={colors.primary} />
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  クルマを買う
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TopHeader>
      <View style={{ gap: 8 }}>
        <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
          査定中の車両
        </Text>
        {currentAppraisalCars?.length > 0 ? (
          <>
            <CurrentAppraisalCarsList
              currentAppraisalCars={currentAppraisalCars}
              currentAppraisalRequests={currentAppraisalRequests}
            />
          </>
        ) : (
          <Card>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                paddingVertical: 24,
                backgroundColor: colors.backgroundPrimary,
                borderRadius: 8,
              }}
            >
              <CarIcon size={24} color={colors.textSecondary} />
              <Text
                style={{ ...typography.heading4, color: colors.textPrimary }}
              >
                査定中の車両はありません
              </Text>
              <Button
                label="車両登録"
                color={colors.primary}
                onPress={guard(() => {
                  router.push("/registrationCar");
                })}
              />
            </View>
          </Card>
        )}
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
          新着在庫車両
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserIndexScreen;
