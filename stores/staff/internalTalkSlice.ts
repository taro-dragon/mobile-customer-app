import firestore from "@react-native-firebase/firestore";
import { StateCreator } from "zustand";
import { InternalTalkSlice } from "@/types/slices/TalkSlice";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Staff } from "@/types/firestore_schema/staff";

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

            const internalTalks = await Promise.all(
              talks.map(async (talk) => {
                try {
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
                  return {
                    ...talk,
                    staffs: staffsMap,
                  };
                } catch (error) {
                  console.error("Error fetching affiliate store:", error);
                  return talk;
                }
              })
            );
            set((state) => ({
              ...state,
              internalTalks: internalTalks,
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
