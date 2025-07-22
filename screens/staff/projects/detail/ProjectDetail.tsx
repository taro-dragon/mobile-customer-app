import React from "react";
import Divider from "@/components/common/Divider";
import Tag from "@/components/common/Tag";
import CarSection from "@/components/staff/projects/detail/CarSection";
import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import { useStore } from "@/hooks/useStore";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";
import { getProjectsStatusLabel } from "@/libs/staffs/projects/getProjectsStatusLabel";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import dayjs from "dayjs";
import { Image } from "expo-image";
import {
  Calendar,
  CarIcon,
  ChevronRight,
  CircleCheck,
  DollarSign,
  FileText,
  Loader,
  MessageSquare,
  User,
  User2,
  UserIcon,
  Users,
} from "lucide-react-native";
import { RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import RelatedItemSection from "@/components/staff/projects/detail/RelatedItemSection";
import Button from "@/components/common/Button";

type ProjectDetailScreenProps = {
  project: ExtendedProject;
  isLoading: boolean;
  mutate: () => void;
};

const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  project,
  isLoading,
  mutate,
}) => {
  const router = useRouter();
  const carData = transformCarData(project as unknown as Car);
  const { currentStoreStaffs } = useStore();
  const { colors, typography } = useTheme();
  const { label, color } = getSourceTypeLabel(project.type);
  const { label: statusLabel, color: statusColor } = getProjectsStatusLabel(
    project.status
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={mutate} />
        }
        contentContainerStyle={{ padding: 16, gap: 20 }}
      >
        <View style={{ gap: 8 }}>
          <View>
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Loader size={24} color={colors.textPrimary} />
              <Text style={{ ...typography.body2, color: colors.textPrimary }}>
                案件タイプ
              </Text>
            </View>
            <Tag label={label} color={color} />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <CircleCheck size={24} color={colors.textPrimary} />
              <Text style={{ ...typography.body2, color: colors.textPrimary }}>
                ステータス
              </Text>
            </View>
            <Tag label={statusLabel} color={statusColor} />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Users size={24} color={colors.textPrimary} />
              <Text style={{ ...typography.body2, color: colors.textPrimary }}>
                担当者
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              {project?.managerStaffs?.map((staffId) => {
                const staff = currentStoreStaffs.find(
                  (staff) => staff.id === staffId
                );
                if (staff?.profileImageUrl) {
                  return (
                    <Image
                      key={staffId}
                      source={{ uri: staff?.profileImageUrl }}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: colors.borderPrimary,
                      }}
                    />
                  );
                } else {
                  return (
                    <View
                      key={staffId}
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: colors.backgroundPrimary,
                        borderRadius: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: colors.borderPrimary,
                      }}
                    >
                      <User size={16} color={colors.textSecondary} />
                    </View>
                  );
                }
              })}
            </View>
          </View>
          {project.appraisal?.expiryDate && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <DollarSign size={24} color={colors.textPrimary} />
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    査定金額有効期限
                  </Text>
                </View>
                <Text
                  style={{ ...typography.title5, color: colors.textPrimary }}
                >
                  {dayjs(project.appraisal.expiryDate.toDate()).format(
                    "YYYY/MM/DD"
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <User2 size={24} color={colors.textPrimary} />
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    査定金額送信者
                  </Text>
                </View>
                <View>
                  {project.appraisal?.senderStaffId && (
                    <Text
                      style={{
                        ...typography.title5,
                        color: colors.textPrimary,
                      }}
                    >
                      {
                        currentStoreStaffs.find(
                          (staff) =>
                            staff.id === project.appraisal?.senderStaffId
                        )?.name
                      }
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Calendar size={24} color={colors.textPrimary} />
              <Text style={{ ...typography.body2, color: colors.textPrimary }}>
                作成日時
              </Text>
            </View>
            <Text style={{ ...typography.title5, color: colors.textPrimary }}>
              {dayjs(project.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
            </Text>
          </View>
        </View>
        <Divider />
        <CarSection project={project} carData={carData} />
        {project.type !== "car_inquiry" && (
          <>
            <Divider />
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ ...typography.title3, color: colors.textPrimary }}
                >
                  現車確認情報
                </Text>
              </View>
              {project.preferredInfo ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    router.push(`/projects/${project.id}/carCheckRequest`);
                  }}
                >
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textPrimary,
                    }}
                  >
                    現車確認回答情報を確認する
                  </Text>
                  <ChevronRight size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ ...typography.body2, color: colors.textSecondary }}
                  >
                    現車確認回答情報がありません
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
        <Divider />
        <RelatedItemSection project={project} />
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button
          label="案件終了"
          onPress={() => {
            console.log("案件を終了する");
          }}
          color={colors.textError}
          isBorder
        />
      </View>
      <SafeAreaBottom />
    </View>
  );
};

export default ProjectDetailScreen;
