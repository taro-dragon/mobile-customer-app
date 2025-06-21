import React, { useState } from "react";

import { useStore } from "@/hooks/useStore";
import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import { useLocalSearchParams } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { requestBulkAppraisal } from "@/libs/user/firestore/requestBulkAppraisal";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import Toast from "react-native-toast-message";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequest, isLoading, mutate } =
    useFetchBulkAppraisalRequest(id);
  const { cars, user } = useStore();
  const car = cars.find((car) => car.id === id);
  const carData = transformCarData(car as Car);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestBulkAppraisal = async () => {
    setIsSubmitting(true);
    try {
      await requestBulkAppraisal({
        carId: id,
        maker: carData.maker.name,
        model: carData.model.name,
        year: Number(car?.year ?? 0),
        grade: carData.grade.gradeName,
        modelNumber: car?.modelNumber ?? "",
        mileage: car?.mileage ?? 0,
        userId: user?.id ?? "",
        prefecture: user?.address1 ?? "",
        sellTime: car?.sellTime ?? "",
      });
      await mutate();
      Toast.show({
        type: "success",
        text1: "一括査定を依頼しました",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "一括査定依頼に失敗しました。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CarDetailScreen
      bulkAppraisalRequest={bulkAppraisalRequest}
      handleRequestBulkAppraisal={handleRequestBulkAppraisal}
      isSubmitting={isSubmitting}
    />
  );
};

export default CarDetail;
