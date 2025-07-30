import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const RenderItem = ({ staffId }: { staffId: string }) => {
  const { currentStoreStaffs } = useStore();
  const { colors, typography } = useTheme();
  const staff = currentStoreStaffs.find((staff) => staff.id === staffId);
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 16,
        borderColor: colors.borderPrimary,
        borderRadius: 8,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {staff?.profileImageUrl ? (
            <Image
              source={{ uri: staff?.profileImageUrl }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.backgroundSecondary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={24} color={colors.textSecondary} />
            </View>
          )}
          <View style={{ gap: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                ...typography.heading3,
              }}
            >
              {staff?.name}
            </Text>
            {staff?.position && (
              <Text
                style={{
                  color: colors.textSecondary,
                  ...typography.body2,
                }}
              >
                {staff?.position}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const ManagerTab: React.FC = () => {
  const { bulkAppraisalBid } = useBulkAppraisalBidContext();
  return (
    <Tabs.FlatList
      data={bulkAppraisalBid.managerStaffIds}
      contentContainerStyle={{
        padding: 16,
        paddingTop: 16,
        gap: 8,
      }}
      renderItem={({ item }) => <RenderItem staffId={item} />}
    />
  );
};

export default ManagerTab;
