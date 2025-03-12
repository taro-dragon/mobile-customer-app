import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Car, CarIcon, List, User } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomerIndex = () => {
  const { colors, typography } = useTheme();
  const { cars } = useStore();
  const currentAppraisalCar = cars.find(
    (car) => car.status === "appraising" || car.status === "company_selection"
  );
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
        <TouchableOpacity
          onPress={() => {
            console.log("test");
          }}
          style={styles.carRegistrationButton}
        >
          <Car size={24} color={colors.primary} />
          <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
            車両登録
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.secondaryButton}>
            <List size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              車両一覧
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <User size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              ユーザー情報更新
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
          査定中の車両
        </Text>
        {currentAppraisalCar ? (
          <CarInfoItem car={currentAppraisalCar} />
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
                onPress={() => {
                  console.log("test");
                }}
              />
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

export default CustomerIndex;
