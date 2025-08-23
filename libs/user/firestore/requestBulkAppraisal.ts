import firestore from "@react-native-firebase/firestore";
import dayjs from "dayjs";

export type RequestBulkAppraisalParams = {
  carId: string;
  maker: string;
  makerName: string;
  model: string;
  modelName: string;
  generation: string;
  generationName: string;
  minorModel: string;
  minorModelName: string;
  grade: string;
  gradeName: string;
  modelNumber: string;
  mileage: number;
  prefecture: string;
  sellTime: string;
  userId: string;
  repairStatus: string;
};

export const requestBulkAppraisal = async (
  params: RequestBulkAppraisalParams
) => {
  const deadline = firestore.Timestamp.fromDate(dayjs().endOf("day").toDate());
  try {
    await firestore().collection("bulkAppraisalRequests").add({
      carId: params.carId,
      maker: params.maker,
      makerName: params.makerName,
      model: params.model,
      modelName: params.modelName,
      generation: params.generation,
      generationName: params.generationName,
      minorModel: params.minorModel,
      minorModelName: params.minorModelName,
      grade: params.grade,
      gradeName: params.gradeName,
      modelNumber: params.modelNumber,
      mileage: params.mileage,
      status: "in_progress",
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      userId: params.userId,
      prefecture: params.prefecture,
      sellTime: params.sellTime,
      repairStatus: params.repairStatus,
      deadline: deadline,
    });
  } catch (error) {
    throw new Error(`Firestore error: ${error}`);
  }
};
