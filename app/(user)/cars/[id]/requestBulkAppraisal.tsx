import { useUserCarContext } from "@/contexts/users/UserCarContext";
import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { requestBulkAppraisal } from "@/libs/user/firestore/requestBulkAppraisal";
import RequestBulkAppraisalScreen from "@/screens/users/cars/requestBulkAppraisal";
import { Car } from "@/types/models/Car";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";

type RequestBulkAppraisalForm = {
  sellTime: string;
  mileage: string;
  repairStatus: string;
};

const schema = z.object({
  sellTime: z.string().min(1, "売却時期を選択してください"),
  mileage: z.string().min(1, "走行距離を選択してください"),
  repairStatus: z.string().min(1, "修復歴を選択してください"),
});

const RequestBulkAppraisal: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      sellTime: "",
      mileage: "",
      repairStatus: "",
    },
  });
  const { mutateBulkAppraisalRequest } = useUserCarContext();
  const { handleSubmit } = form;
  const { cars, user } = useStore();
  const car = cars.find((car) => car.id === id);
  const carData = transformCarData(car as Car);
  const router = useRouter();
  const handleRequestBulkAppraisal = async (data: RequestBulkAppraisalForm) => {
    try {
      await requestBulkAppraisal({
        carId: id,
        maker: carData.maker.name,
        model: carData.model.name,
        year: Number(car?.year ?? 0),
        grade: carData.grade.gradeName,
        modelNumber: car?.modelNumber ?? "",
        mileage: Number(data.mileage),
        userId: user?.id ?? "",
        prefecture: user?.address1 ?? "",
        sellTime: data.sellTime,
        repairStatus: data.repairStatus,
      });
      mutateBulkAppraisalRequest();
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
    }
  };

  const onSubmit = handleSubmit(handleRequestBulkAppraisal);

  return (
    <FormProvider {...form}>
      <RequestBulkAppraisalScreen carData={carData} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default RequestBulkAppraisal;
