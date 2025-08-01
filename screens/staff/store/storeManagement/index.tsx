import ManageStorePanel from "@/components/staff/manageStore/Panel";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Car, Gavel, Handshake, Store, Users } from "lucide-react-native";
import { View } from "react-native";

const StoreManagementScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
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
          onPress={() => router.push("/store/shopInfo")}
        />
        <ManageStorePanel
          title="スタッフ管理"
          icon={<Users size={32} color={colors.primary} />}
          onPress={() => router.push("/store/staffList")}
        />
        <ManageStorePanel
          title="在庫管理"
          icon={<Car size={32} color={colors.primary} />}
          onPress={() => router.push("/stockCars")}
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
          onPress={() => {
            router.push("/bulkAppraisalBids");
          }}
        />
        <ManageStorePanel
          title="オファー管理"
          icon={<Handshake size={32} color={colors.primary} />}
          onPress={() => {
            router.push("/offers");
          }}
        />
        <View style={{ flex: 3 }} />
      </View>
    </View>
  );
};

export default StoreManagementScreen;
