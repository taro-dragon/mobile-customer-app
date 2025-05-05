import { StaffTalkSlice } from "@/types/slices/TalkSlice";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { Car } from "@/types/models/Car";

export const createStaffTalkSlice: StateCreator<
  StaffTalkSlice,
  [],
  [],
  StaffTalkSlice
> = (set, get) => ({
  staffTalks: [] as TalkWithAffiliate[],
  staffTalkLoading: false,
  staffUnsubscribe: undefined,
  fetchStaffTalks: (affiliateStoreId: string) => {
    const currentUnsubscribe = get().staffUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, talkLoading: true }));
    const unsubscribe = firestore()
      .collection("talks")
      .where("affiliateStoreId", "==", affiliateStoreId)
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
                    .collection("users")
                    .doc(talk.userId)
                    .get();
                  const car = await firestore()
                    .collection("cars")
                    .doc(talk.carId)
                    .get();
                  return {
                    ...talk,
                    affiliateStore: affiliateStore.data() as AffiliateStore,
                    car: car.data() as Car,
                  };
                } catch (error) {
                  console.error("Error fetching affiliate store:", error);
                  return talk;
                }
              })
            );

            set((state) => ({
              ...state,
              talks: talksWithAffiliateStores,
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

    set((state) => ({ ...state, unsubscribe }));
    return unsubscribe;
  },
  deleteStaffTalk: () => {
    set((state) => ({ ...state, staffTalks: [] }));
  },
  setStaffTalkLoading: (staffTalkLoading: boolean) => {
    set((state) => ({ ...state, staffTalkLoading }));
  },
  clearStaffTalks: () => {
    if (get().staffUnsubscribe) {
      get().staffUnsubscribe!();
    }
    set((state) => ({ ...state, staffTalks: [], staffUnsubscribe: undefined }));
  },
});
