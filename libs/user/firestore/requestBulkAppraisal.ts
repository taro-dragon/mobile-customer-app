import firestore from "@react-native-firebase/firestore";
import dayjs from "dayjs";

export type RequestBulkAppraisalParams = {
  carId: string;
  maker: string;
  model: string;
  year: number;
  grade: string;
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
      model: params.model,
      year: params.year,
      grade: params.grade,
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
