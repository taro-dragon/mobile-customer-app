import { TalkSlice } from "@/types/slices/TalkSlice";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { Car } from "@/types/models/Car";
import { Stock } from "@/types/firestore_schema/stock";

export const createTalkSlice: StateCreator<TalkSlice, [], [], TalkSlice> = (
  set,
  get
) => ({
  userTalks: [] as TalkWithAffiliate[],
  talkLoading: false,
  talkUnsubscribe: undefined,
  fetchUserTalks: (userId: string) => {
    const currentUnsubscribe = get().talkUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, talkLoading: true }));
    const unsubscribe = firestore()
      .collection("talks")
      .where("userId", "==", userId)
      .where("isArchived", "==", false)
      .orderBy("lastMessageAt", "desc")
      .onSnapshot(
        async (snapshot) => {
          try {
            const talks = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              } as TalkWithAffiliate;
            });

            const talksWithAffiliateStores = await Promise.all(
              talks.map(async (talk) => {
                try {
                  const affiliateStore = await firestore()
                    .collection("shops")
                    .doc(talk.affiliateStoreId)
                    .get();

                  let sourceCar: Car | undefined;
                  let sourceStockCar: Stock | undefined;

                  if (talk.sourceType === "car_inquiry") {
                    const stockCar = await firestore()
                      .collection("stockCars")
                      .doc(talk.sourceId)
                      .get();
                    sourceStockCar = stockCar.data() as Stock;
                  } else if (talk.sourceType === "buy_offer") {
                    const car = await firestore()
                      .collection("cars")
                      .doc(talk.sourceCarId)
                      .get();
                    sourceCar = car.data() as Car;
                  } else {
                    const car = await firestore()
                      .collection("cars")
                      .doc(talk.carId)
                      .get();
                    sourceCar = car.data() as Car;
                  }

                  return {
                    ...talk,
                    affiliateStore: affiliateStore.data() as AffiliateStore,
                    sourceCar,
                    sourceStockCar,
                  };
                } catch (error) {
                  console.error("Error fetching affiliate store:", error);
                  return talk;
                }
              })
            );

            set((state) => ({
              ...state,
              userTalks: talksWithAffiliateStores,
              talkLoading: false,
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

    set((state) => ({ ...state, talkUnsubscribe: unsubscribe }));
    return unsubscribe;
  },
  deleteTalk: () => {
    set((state) => ({ ...state, userTalks: [] }));
  },
  setTalkLoading: (talkLoading: boolean) => {
    set((state) => ({ ...state, talkLoading }));
  },
  clearTalks: () => {
    if (get().talkUnsubscribe) {
      get().talkUnsubscribe!();
    }
    set((state) => ({ ...state, userTalks: [], unsubscribe: undefined }));
  },
});
