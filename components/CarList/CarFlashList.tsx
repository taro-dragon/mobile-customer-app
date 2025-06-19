import React from "react";
import { FlatList, Text, View } from "react-native";

import { Car } from "@/types/models/Car";
import CarInfoItem from "../CarInfo/CarInfoItem";
import { useTheme } from "@/contexts/ThemeContext";
import { CarIcon } from "lucide-react-native";

type CarFlashListProps = {
  cars: Car[];
};

const CarFlashList: React.FC<CarFlashListProps> = ({ cars }) => {
  const { colors, typography } = useTheme();
  return (
    <FlatList
      data={cars}
      contentContainerStyle={{ padding: 16, flexGrow: 1 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }: { item: Car }) => <CarInfoItem car={item} />}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <CarIcon size={48} color={colors.iconSecondary} strokeWidth={1.5} />
          <Text style={{ color: colors.textSecondary, ...typography.heading2 }}>
            車両がありません
          </Text>
        </View>
      }
    />
  );
};

export default CarFlashList;
