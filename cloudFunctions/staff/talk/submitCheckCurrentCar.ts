import functions from "@react-native-firebase/functions";

type RequestData = {
  talkId: string;
  shopId: string;
};

export const submitCheckCurrentCar = async ({
  talkId,
  shopId,
}: RequestData) => {
  try {
    const requestCheckCurrentCar = functions().httpsCallable(
      "requestCheckCurrentCar"
    );
    await requestCheckCurrentCar({ talkId, shopId });
  } catch (error) {
    throw error;
  }
};
