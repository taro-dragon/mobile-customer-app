import functions from "@react-native-firebase/functions";

type RequestData = {
  talkId: string;
  shopId: string;
  appraisalPrice: number;
  appraisalPriceNote?: string;
  expiryDate: string;
};

export const submitAppraisalPrice = async ({
  talkId,
  shopId,
  appraisalPrice,
  appraisalPriceNote,
  expiryDate,
}: RequestData) => {
  try {
    const createAppraisalPrice = functions().httpsCallable(
      "createAppraisalPrice"
    );
    await createAppraisalPrice({
      talkId,
      shopId,
      appraisalPrice,
      appraisalPriceNote,
      expiryDate,
    });
  } catch (error) {
    throw error;
  }
};
