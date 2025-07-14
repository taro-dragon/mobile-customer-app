import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import Card from "@/components/common/Card";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";
import Tag from "@/components/common/Tag";
import { useStore } from "@/hooks/useStore";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Project } from "@/types/firestore_schema/project";

type ProjectItemProps = {
  project: Project;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(project as unknown as Car);
  const { label, color } = getSourceTypeLabel(project.type);
  const { currentStoreStaffs } = useStore();
  const router = useRouter();
  return (
    <Card
      style={{ backgroundColor: colors.backgroundSecondary }}
      onPress={() => router.push(`/projects/${project.id}`)}
    >
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
              {carData?.maker.name}
            </Text>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              {carData?.model.name}
            </Text>
          </View>
          <Tag label={label} color={color} />
        </View>
        <View style={{ gap: 4 }}>
          <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
            年式: {carData?.year.year}
          </Text>
          <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
            型番: {carData?.grade?.modelNumber.replace(/[\s\u3000]/g, "")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 1 }}>
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
                    width: 24,
                    height: 24,
                    borderRadius: 12,
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
                    width: 24,
                    height: 24,
                    backgroundColor: colors.backgroundPrimary,
                    borderRadius: 12,
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
    </Card>
  );
};

export default ProjectItem;
