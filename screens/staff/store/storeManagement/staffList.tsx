import React from "react";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { User, UserPlus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Tag from "@/components/common/Tag";
import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";

type Props = {
  staffList: Staff[] | undefined;
  isOwner: boolean;
};

const StaffListScreen: React.FC<Props> = ({ staffList, isOwner }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <>
      {isOwner && (
        <Stack.Screen
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/store/createStaff")}
              >
                <UserPlus size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      )}
      <FlashList
        data={staffList}
        overrideProps={{
          contentContainerStyle: {
            flexGrow: 1,
            paddingTop: 16,
          },
        }}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
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
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  {item.profileImageUrl ? (
                    <Image
                      source={{ uri: item.profileImageUrl }}
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
                        ...typography.heading2,
                      }}
                    >
                      {item.name}
                    </Text>
                    {item.position && (
                      <Text
                        style={{
                          color: colors.textSecondary,
                          ...typography.body2,
                        }}
                      >
                        {item.position}
                      </Text>
                    )}
                  </View>
                </View>
                {item.isOwner && <Tag label="オーナー" color="info" />}
              </View>
              <View>
                <Text
                  style={{ color: colors.textSecondary, ...typography.body2 }}
                >
                  登録日時:{" "}
                  {dayjs(item.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
                </Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </>
  );
};

export default StaffListScreen;
