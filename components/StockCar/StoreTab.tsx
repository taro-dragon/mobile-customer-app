import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { Shop } from "@/types/models/Shop";

type StoreTabProps = {
  store: Shop;
};

const StoreTab: React.FC<StoreTabProps> = ({ store }) => {
  return (
    <Tabs.ScrollView>
      <View>
        <Text>{store.shopName}</Text>
      </View>
    </Tabs.ScrollView>
  );
};

export default StoreTab;
