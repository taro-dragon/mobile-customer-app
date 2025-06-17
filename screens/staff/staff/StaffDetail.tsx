import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import dayjs from "dayjs";
import { Image } from "expo-image";
import {
  Briefcase,
  Calendar,
  Gavel,
  Handshake,
  IdCard,
  Mail,
  Pencil,
  Phone,
  User,
} from "lucide-react-native";
import Tag from "@/components/common/Tag";
import StaffDetailItem from "@/components/staff/staff/StaffDetailItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";

type StaffDetailScreenProps = {
  staff: Staff;
  isCurrentStaff: boolean;
};

const StaffDetailScreen: React.FC<StaffDetailScreenProps> = ({
  staff,
  isCurrentStaff,
}) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <>
      {isCurrentStaff && (
        <Stack.Screen
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/staff/edit",
                    params: { id: staff.id },
                  });
                }}
              >
                <Pencil size={20} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      )}
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
            <View style={{ gap: 4, alignItems: "center" }}>
              <Text
                style={{ ...typography.body4, color: colors.textSecondary }}
              >
                {staff.furigana}
              </Text>
              <Text
                style={{ ...typography.heading2, color: colors.textPrimary }}
              >
                {staff.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          {!staff.isOwner && (
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "center",
              }}
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
            {staff.phoneNumber && (
              <StaffDetailItem
                icon={<Phone size={20} color={colors.primary} />}
                title="電話番号"
                value={staff.phoneNumber}
              />
            )}
            {staff.position && (
              <StaffDetailItem
                icon={<Briefcase size={20} color={colors.primary} />}
                title="役職"
                value={staff.position}
              />
            )}
            {staff.employeeId && (
              <StaffDetailItem
                icon={<IdCard size={20} color={colors.primary} />}
                title="社員番号"
                value={staff.employeeId}
              />
            )}
            <StaffDetailItem
              icon={<Calendar size={20} color={colors.primary} />}
              title="登録日時"
              value={dayjs(staff.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default StaffDetailScreen;
