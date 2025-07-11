import { StaffTalkSlice } from "@/types/slices/TalkSlice";
import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { Car } from "@/types/models/Car";
import { User } from "@/types/firestore_schema/users";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Stock } from "@/types/firestore_schema/stock";
import { Staff } from "@/types/firestore_schema/staff";

export const createStaffTalkSlice: StateCreator<
  StaffTalkSlice,
  [],
  [],
  StaffTalkSlice
> = (set, get) => ({
  staffTalks: [] as TalkWithUser[],
  staffTalkLoading: false,
  staffTalkUnsubscribe: undefined,
  fetchStaffTalks: (shopId: string, staffId: string) => {
    const currentUnsubscribe = get().staffTalkUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, talkLoading: true }));
    const unsubscribe = firestore()
      .collection("talks")
      .where("affiliateStoreId", "==", shopId)
      .where("isArchived", "==", false)
      .where("staffIds", "array-contains", staffId)
      .orderBy("lastMessageAt", "desc")
      .onSnapshot(
        async (snapshot) => {
          try {
            const talks = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              } as TalkWithUser;
            });

            const talkWithUser = await Promise.all(
              talks.map(async (talk) => {
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
                        console.error(
                          `Error fetching staff ${staffId}:`,
                          error
                        );
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
                    };
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
                    };
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
                    };
                  }
                } catch (error) {
                  console.error("Error fetching affiliate store:", error);
                  return talk;
                }
              })
            );
            set((state) => ({
              ...state,
              staffTalks: talkWithUser,
              staffTalkLoading: false,
            }));
          } catch (error) {
            console.error("Error processing talks:", error);
            set((state) => ({ ...state, talkLoading: false }));
          }
        },
        (error) => {
          console.error("Error fetching talks:", error);
          set((state) => ({ ...state, talkLoading: false }));
        }
      );

    set((state) => ({ ...state, staffTalkUnsubscribe: unsubscribe }));
    return unsubscribe;
  },
  deleteStaffTalk: () => {
    set((state) => ({ ...state, staffTalks: [] }));
  },
  setStaffTalkLoading: (staffTalkLoading: boolean) => {
    set((state) => ({ ...state, staffTalkLoading }));
  },
  clearStaffTalks: () => {
    if (get().staffTalkUnsubscribe) {
      get().staffTalkUnsubscribe!();
    }
    set((state) => ({
      ...state,
      staffTalks: [],
      staffUnsubscribe: undefined,
    }));
  },
});
