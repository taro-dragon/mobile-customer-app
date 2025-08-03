import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Staff } from "@/types/firestore_schema/staff";
import { Stock } from "@/types/firestore_schema/stock";
import { Talk } from "@/types/firestore_schema/talks";
import { User } from "@/types/firestore_schema/users";
import { Car } from "@/types/models/Car";
import firestore from "@react-native-firebase/firestore";

const fetchTalk = async (talkId: string) => {
  try {
    const talkRef = await firestore().collection("talks").doc(talkId).get();
    const talk = {
      ...talkRef.data(),
      id: talkRef.id,
    } as Talk;
    const talkWithUser = async () => {
      try {
        // ユーザー情報を取得してtalkオブジェクトに含める
        const userDoc = await firestore()
          .collection("users")
          .doc(talk.userId)
          .get();
        const user = userDoc.data() as User;

        // スタッフ情報を取得してtalkオブジェクトに含める
        const staffIds = talk.staffIds || [];
        const staffsMap = new Map<string, Staff>();

        if (staffIds.length > 0) {
          const staffPromises = staffIds.map(async (staffId) => {
            try {
              const staffDoc = await firestore()
                .collection("staffs")
                .doc(staffId)
                .get();
              if (staffDoc.exists()) {
                const staffData = staffDoc.data() as Staff;
                staffsMap.set(staffId, staffData);
              }
            } catch (error) {
              console.error(`Error fetching staff ${staffId}:`, error);
            }
          });
          await Promise.all(staffPromises);
        }

        const sourceType = talk.sourceType;
        if (sourceType === "car_inquiry") {
          const stockCar = await firestore()
            .collection("stockCars")
            .doc(talk.sourceId)
            .get();
          return {
            ...talk,
            user: user,
            staffs: staffsMap,
            sourceStockCar: stockCar.data() as Stock,
          } as TalkWithUser;
        } else if (sourceType === "buy_offer") {
          const car = await firestore()
            .collection("cars")
            .doc(talk.sourceCarId)
            .get();
          return {
            ...talk,
            user: user,
            staffs: staffsMap,
            sourceCar: car.data() as Car,
          } as TalkWithUser;
        } else {
          const car = await firestore()
            .collection("cars")
            .doc(talk.carId)
            .get();
          return {
            ...talk,
            user: user,
            staffs: staffsMap,
            sourceCar: car.data() as Car,
          } as TalkWithUser;
        }
      } catch (error) {
        throw error;
      }
    };
    return await talkWithUser();
  } catch (error) {
    throw error;
  }
};

export default fetchTalk;
