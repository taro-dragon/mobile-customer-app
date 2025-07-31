import { Shop } from "@/types/models/Shop";
import React from "react";
import { View } from "react-native";

type Store = {
  stores: Shop[];
};

const ShopSelectScreen: React.FC<Store> = ({ stores }) => {
  console.log("stores", JSON.stringify(stores, null, 2));
  return <View></View>;
};

export default ShopSelectScreen;
