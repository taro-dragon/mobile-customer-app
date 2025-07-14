import { Text, View } from "react-native";
import { ExtendProject } from "@/hooks/staff/projects/useInProgressProjects";
import { useTheme } from "@/contexts/ThemeContext";
import Card from "@/components/common/Card";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { getSourceTypeLabel } from "@/libs/getSourceTypeLabel";
import Tag from "@/components/common/Tag";

type ProjectItemProps = {
  project: ExtendProject;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(project as unknown as Car);
  const { label, color } = getSourceTypeLabel(project.type);
  return (
    <Card style={{ backgroundColor: colors.backgroundSecondary }}>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ gap: 4 }}>
            <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
              {carData?.maker.name}
            </Text>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              {carData?.model.name}
            </Text>
          </View>
          <Tag label={label} color={color} />
        </View>
        <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
          {carData?.year.year}
        </Text>
      </View>
    </Card>
  );
};

export default ProjectItem;
