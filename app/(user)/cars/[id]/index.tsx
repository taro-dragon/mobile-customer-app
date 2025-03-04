import React, { useEffect } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import { useBulkAppraisal } from "@/hooks/useBulkAppraisal";
import AppraisalSection from "@/components/CarInfo/AppraisalSection";
import AppraisalStatusTag from "@/components/appraisal/AppraisalStatusTag";
import OfferSection from "@/components/CarInfo/OfferSection";
import CarDetailHeader from "@/components/CarDetail/CarHeader";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import OfferList from "@/components/CarDetail/CarDetailOfferTab";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars, fetchBulkAppraisalRequests, user } = useStore();
  const { isDeadlineRequest } = useBulkAppraisal();
  const car = cars.find((car) => car.id === id);
  const ref = React.useRef<ICarouselInstance>(null);
  const carData = transformCarData(car as Car);
  const { colors, typography } = useTheme();
  const carImages = Object.values(car?.images ?? {});
  const width = Dimensions.get("window").width;
  const guard = useRegistrationGuard();
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchBulkAppraisalRequests(user.id);
    }
  }, [user?.id]);

  const onViewOffersPress = guard(() => {
    router.push(`/cars/${id}/offers`);
  });

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Container
        renderHeader={() => <CarDetailHeader />}
        headerContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { height: 0, width: 0 },
          borderBottomWidth: 1,
          borderBottomColor: colors.gray200,
        }}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            activeColor={colors.primary}
            inactiveColor={colors.textSecondary}
            indicatorStyle={{
              backgroundColor: colors.primary,
              height: 3,
              borderRadius: 3,
            }}
            style={{
              backgroundColor: colors.backgroundPrimary,
            }}
            labelStyle={typography.heading3}
          />
        )}
      >
        <Tabs.Tab name="買取オファー">
          <OfferList />
        </Tabs.Tab>
        <Tabs.Tab name="一括査定結果">
          <Tabs.ScrollView></Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default CarDetail;
