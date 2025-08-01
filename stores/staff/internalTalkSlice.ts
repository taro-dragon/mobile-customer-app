import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { InternalTalkSlice } from "@/types/slices/TalkSlice";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Staff } from "@/types/firestore_schema/staff";
import { InternalTalk } from "@/types/firestore_schema/talks";

export const createInternalTalkSlice: StateCreator<
  InternalTalkSlice,
  [],
  [],
  InternalTalkSlice
> = (set, get) => ({
  internalTalks: [],
  internalTalkLoading: false,
  internalTalkUnsubscribe: undefined,
  fetchInternalTalks: (shopId: string, staffId: string) => {
    const currentUnsubscribe = get().internalTalkUnsubscribe;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }
    set((state) => ({ ...state, talkLoading: true }));
    const unsubscribe = firestore()
      .collection("shops")
      .doc(shopId)
      .collection("talks")
      .where("staffIds", "array-contains", staffId)
      .orderBy("updatedAt", "desc")
      .onSnapshot(
        async (snapshot) => {
          try {
            const talks = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              } as InternalTalk;
            });

            set((state) => ({
              ...state,
              internalTalks: talks,
              internalTalkLoading: false,
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

    set((state) => ({ ...state, internalTalkUnsubscribe: unsubscribe }));
    return unsubscribe;
  },
  deleteInternalTalk: () => {
    set((state) => ({ ...state, internalTalks: [] }));
  },
  setInternalTalkLoading: (internalTalkLoading: boolean) => {
    set((state) => ({ ...state, internalTalkLoading }));
  },
  clearInternalTalks: () => {
    if (get().internalTalkUnsubscribe) {
      get().internalTalkUnsubscribe!();
    }
    set((state) => ({
      ...state,
      internalTalks: [],
      internalTalkUnsubscribe: undefined,
    }));
  },
});
