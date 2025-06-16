import Tag from "@/components/common/Tag";
import StaffDetailItem from "@/components/staff/staff/StaffDetailItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";
import { Image } from "expo-image";
import { Gavel, Handshake, IdCard, Mail, User } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type StaffDetailScreenProps = {
  staff: Staff;
};

const StaffDetailScreen: React.FC<StaffDetailScreenProps> = ({ staff }) => {
  const { colors, typography } = useTheme();
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.backgroundSecondary,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 32,
          gap: 8,
        }}
      >
        {staff.profileImageUrl ? (
          <Image
            source={{ uri: staff.profileImageUrl }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.backgroundPrimary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={24} color={colors.textSecondary} />
          </View>
        )}
        {staff.isOwner && <Tag label="管理者" color="info" />}
        <View style={{ alignItems: "center", gap: 4 }}>
          {staff.position && (
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {staff.position}
            </Text>
          )}
          <View style={{ gap: 4, alignItems: "center" }}>
            <Text style={{ ...typography.body4, color: colors.textSecondary }}>
              {staff.furigana}
            </Text>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              {staff.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        {!staff.isOwner && (
          <View
            style={{ flexDirection: "row", gap: 16, justifyContent: "center" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                borderRadius: 8,
                padding: 12,
                gap: 8,
              }}
            >
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                担当一括査定
              </Text>
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
                <Gavel size={24} color={colors.primary} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                borderRadius: 8,
                padding: 12,
                gap: 8,
              }}
            >
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                担当買取オファー
              </Text>
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
                <Handshake size={24} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            padding: 12,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            gap: 16,
          }}
        >
          <StaffDetailItem
            icon={<Mail size={20} color={colors.primary} />}
            title="メールアドレス"
            value={staff.email}
          />
          {staff.employeeId && (
            <StaffDetailItem
              icon={<IdCard size={20} color={colors.primary} />}
              title="社員番号"
              value={staff.employeeId}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffDetailScreen;
