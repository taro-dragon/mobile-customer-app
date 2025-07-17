import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";

type Props = {
  talk: TalkWithUser;
};

const CarCheckRequestScreen: React.FC<Props> = ({ talk }) => {
  const { colors, typography } = useTheme();
  return (
    <ScrollView>
      <View style={{ gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
            希望日時
          </Text>
        </View>

        {talk.preferredInfo?.preferredDates.map((dateField, index) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderColor: colors.borderPrimary,
              borderRadius: 8,
              padding: 12,
              gap: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 24,
              }}
            >
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textPrimary,
                }}
              >
                第{dateField.priority}希望
              </Text>
            </View>

            {/* 日時選択 */}
            <View
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{ color: colors.textPrimary, ...typography.body2 }}
                >
                  {dayjs(dateField.datetime.seconds * 1000).format(
                    "YYYY/MM/DD HH:mm"
                  )}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CarCheckRequestScreen;
