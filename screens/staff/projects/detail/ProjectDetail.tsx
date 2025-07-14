import Divider from "@/components/common/Divider";
import Tag from "@/components/common/Tag";
import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import { useStore } from "@/hooks/useStore";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";
import { getProjectsStatusLabel } from "@/libs/staffs/projects/getProjectsStatusLabel";
import { transformCarData } from "@/libs/transformCarData";
import { Project } from "@/types/firestore_schema/project";
import { Car } from "@/types/models/Car";
import dayjs from "dayjs";
import { Image } from "expo-image";
import {
  Calendar,
  CarIcon,
  ChevronRight,
  CircleCheck,
  Loader,
  User,
  Users,
} from "lucide-react-native";
import { RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView, Text, View } from "react-native";

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
  const carData = transformCarData(project as unknown as Car);
  const { currentStoreStaffs } = useStore();
  const { colors, typography } = useTheme();
  const { label, color } = getSourceTypeLabel(project.type);
  const { label: statusLabel, color: statusColor } = getProjectsStatusLabel(
    project.status
  );
  const targetCarData =
    project.type === "car_inquiry"
      ? project.targetStockCarData
      : project.targetCarData;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={mutate} />
      }
      contentContainerStyle={{ padding: 16, gap: 12 }}
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
        <View style={{ gap: 4 }}>
          <Text style={{ ...typography.body2, color: colors.textPrimary }}>
            年式: {carData.year.year}
          </Text>
          <Text style={{ ...typography.body2, color: colors.textPrimary }}>
            グレード: {carData.grade?.gradeName}
          </Text>
          <Text style={{ ...typography.body2, color: colors.textPrimary }}>
            型番: {carData.grade?.modelNumber.replace(/[\s\u3000]/g, "")}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
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
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
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
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Calendar size={24} color={colors.textPrimary} />
            <Text style={{ ...typography.body2, color: colors.textPrimary }}>
              作成日時
            </Text>
          </View>
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            {dayjs(project.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
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
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
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
                    <User size={24} color={colors.textSecondary} />
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
      <Divider />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <CarIcon size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.body2, color: colors.textPrimary }}>
            対象車両
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Image
            source={{ uri: targetCarData?.images.front }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.borderPrimary,
            }}
          />
          <ChevronRight size={24} color={colors.textPrimary} />
        </View>
      </TouchableOpacity>
      <Divider />
    </ScrollView>
  );
};

export default ProjectDetailScreen;
