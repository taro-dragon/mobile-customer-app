import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { ScrollView, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const CustomerIndex = () => {
  const { cars, deleteCustomer } = useStore();
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 8 }}
    >
      <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
        愛車
      </Text>
      {cars.length > 0 ? (
        <CarInfoItem car={cars[0]} />
      ) : (
        <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
          愛車がありません
        </Text>
      )}
      {/* <Button
        label="ログアウト"
        onPress={() => {
          deleteCustomer();
          auth().signOut();
        }}
        color={colors.primary}
      /> */}
      <Button
        label="トースト確認"
        onPress={() => {
          Toast.show({
            type: "success",
            text1: "成功",
            text2: "成功しました",
          });
        }}
        color={colors.primary}
      />
      <Button
        label="トースト確認"
        onPress={() => {
          Toast.show({
            type: "error",
            text1: "エラー",
            text2: "エラーが発生しました",
          });
        }}
        color={colors.primary}
      />
      <Button
        label="トースト確認"
        onPress={() => {
          Toast.show({
            type: "warning",
            text1: "警告",
            text2: "警告が発生しました",
          });
        }}
        color={colors.primary}
      />
    </ScrollView>
  );
};

export default CustomerIndex;
