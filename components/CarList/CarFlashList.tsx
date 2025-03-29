import { Car } from "@/types/models/Car";
import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import CarInfoItem from "../CarInfo/CarInfoItem";

type CarFlashListProps = {
  cars: Car[];
};

const CarFlashList: React.FC<CarFlashListProps> = ({ cars }) => {
  return (
    <Tabs.FlatList
      data={cars}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }: { item: Car }) => <CarInfoItem car={item} />}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text>車両がありません</Text>
        </View>
      }
    />
  );
};

export default CarFlashList;
