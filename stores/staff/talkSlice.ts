import { StaffTalkSlice } from "@/types/slices/TalkSlice";
import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { Car } from "@/types/models/Car";
import { User } from "@/types/firestore_schema/users";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Stock } from "@/types/firestore_schema/stock";

export const createStaffTalkSlice: StateCreator<
  StaffTalkSlice,
  [],
  [],
  StaffTalkSlice
> = (set, get) => ({
  staffTalks: [] as TalkWithUser[],
  staffTalkLoading: false,
  staffTalkUnsubscribe: undefined,
  fetchStaffTalks: (shopId: string) => {
    const currentUnsubscribe = get().staffTalkUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, talkLoading: true }));
    const unsubscribe = firestore()
      .collection("talks")
      .where("affiliateStoreId", "==", shopId)
      // .where("isArchived", "==", false)
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
                  const user = await firestore()
                    .collection("users")
                    .doc(talk.userId)
                    .get();
                  const sourceType = talk.sourceType;
                  if (sourceType === "car_inquiry") {
                    const stockCar = await firestore()
                      .collection("stockCars")
                      .doc(talk.sourceId)
                      .get();
                    return {
                      ...talk,
                      user: user.data() as User,
                      sourceStockCar: stockCar.data() as Stock,
                    };
                  } else {
                    const car = await firestore()
                      .collection("cars")
                      .doc(talk.carId)
                      .get();

                    return {
                      ...talk,
                      user: user.data() as User,
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
    set((state) => ({ ...state, staffTalks: [], staffUnsubscribe: undefined }));
  },
});
