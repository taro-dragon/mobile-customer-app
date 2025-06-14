import ManageStorePanel from "@/components/staff/manageStore/Panel";
import { useTheme } from "@/contexts/ThemeContext";
import { Car, Gavel, Handshake, Store, Users } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

const StoreManagementScreen = () => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 32,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <ManageStorePanel
          title="店舗情報管理"
          icon={<Store size={32} color={colors.primary} />}
          onPress={() => {}}
        />
        <ManageStorePanel
          title="スタッフ管理"
          icon={<Users size={32} color={colors.primary} />}
          onPress={() => {}}
        />
        <ManageStorePanel
          title="在庫管理"
          icon={<Car size={32} color={colors.primary} />}
          onPress={() => {}}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <ManageStorePanel
          title="一括査定管理"
          icon={<Gavel size={32} color={colors.primary} />}
          onPress={() => {}}
        />
        <ManageStorePanel
          title="オファー管理"
          icon={<Handshake size={32} color={colors.primary} />}
          onPress={() => {}}
        />
        <View style={{ flex: 3 }} />
      </View>
    </View>
  );
};

export default StoreManagementScreen;
