import { TalkSlice } from "@/types/slices/TalkSlice";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";

export const createTalkSlice: StateCreator<TalkSlice, [], [], TalkSlice> = (
  set,
  get
) => ({
  talks: [] as TalkWithAffiliate[],
  talkLoading: false,
  unsubscribe: undefined,
  fetchUserTalks: (userId: string) => {
    const currentUnsubscribe = get().unsubscribe;
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
                  return {
                    ...talk,
                    affiliateStore: affiliateStore.data() as AffiliateStore,
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
  deleteTalk: () => {
    set({ talks: [] });
  },
  setTalkLoading: (talkLoading: boolean) => {
    set((state) => ({ ...state, talkLoading }));
  },
});
