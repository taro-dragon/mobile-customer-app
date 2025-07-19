import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import { useRouter } from "expo-router";
import {
  CarIcon,
  FileText,
  MessageSquare,
  UserIcon,
} from "lucide-react-native";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type RelatedItemSectionProps = {
  project: ExtendedProject;
};

const RelatedItemSection: React.FC<RelatedItemSectionProps> = ({ project }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const panels = useMemo(() => {
    if (project.type === "car_inquiry") {
      return [
        {
          title: "車両情報",
          icon: <CarIcon size={24} color={colors.textPrimary} />,
          onPress: () => {},
        },
        {
          title: "顧客情報",
          icon: <UserIcon size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/customer/${project.userId}`);
          },
        },
        {
          title: "トーク",
          icon: <MessageSquare size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/talks/${project.id}`);
          },
        },
      ];
    } else if (project.type === "buy_offer") {
      return [
        {
          title: "査定情報",
          icon: <FileText size={24} color={colors.textPrimary} />,
          onPress: () => {},
        },
        {
          title: "車両情報",
          icon: <CarIcon size={24} color={colors.textPrimary} />,
          onPress: () => {},
        },
        {
          title: "顧客情報",
          icon: <UserIcon size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/customer/${project.userId}`);
          },
        },
        {
          title: "トーク",
          icon: <MessageSquare size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/talks/${project.id}`);
          },
        },
      ];
    } else {
      return [
        {
          title: "査定情報",
          icon: <FileText size={24} color={colors.textPrimary} />,
          onPress: () => {},
        },
        {
          title: "車両情報",
          icon: <CarIcon size={24} color={colors.textPrimary} />,
          onPress: () => {},
        },
        {
          title: "顧客情報",
          icon: <UserIcon size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/customer/${project.userId}`);
          },
        },
        {
          title: "トーク",
          icon: <MessageSquare size={24} color={colors.textPrimary} />,
          onPress: () => {
            router.push(`/talks/${project.id}`);
          },
        },
      ];
    }
  }, [project]);
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ ...typography.title3, color: colors.textPrimary }}>
        関連項目
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {panels.map((panel, i) => (
          <TouchableOpacity
            key={i}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.borderPrimary,
              borderRadius: 8,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
            onPress={panel.onPress}
          >
            {panel.icon}
            <Text style={{ ...typography.body2, color: colors.textPrimary }}>
              {panel.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RelatedItemSection;
