import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { List, Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RegistrationBuyOfferIndexScreen: React.FC = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        }}
        onPress={() => {
          router.push("/registrationStock/selectMaker");
        }}
      >
        <List size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          一覧から車種を絞り込む
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        }}
        onPress={() => {
          router.push("/registrationBuyOffer/searchTypeNumber");
        }}
      >
        <Search size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          型番から車種を絞り込む
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationBuyOfferIndexScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  button: {
    height: 88,
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
  },
});
