import React from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import { useRouter } from "expo-router";
import { CarIcon, ShoppingCart, Tag } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Car } from "@/types/models/Car";

type UserIndexScreenProps = {
  currentAppraisalCars: Car[];
};

const UserIndexScreen: React.FC<UserIndexScreenProps> = ({
  currentAppraisalCars,
}) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const guard = useRegistrationGuard();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    carRegistrationButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      height: 96,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      height: 88,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
  });
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 24 }}
    >
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={guard(() => {
              router.push("/(user)/(tabs)/sell");
            })}
          >
            <Tag size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
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
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              クルマを買う
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
          査定中の車両
        </Text>
        {currentAppraisalCars?.length ? (
          <>
            {currentAppraisalCars.map((item, i) => (
              <CarInfoItem car={item} key={i} />
            ))}
          </>
        ) : (
          <Card>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                paddingVertical: 12,
              }}
            >
              <CarIcon size={24} color={colors.textSecondary} />
              <Text
                style={{ ...typography.body2, color: colors.textSecondary }}
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
    </ScrollView>
  );
};

export default UserIndexScreen;
