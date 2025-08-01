import { TalkWithAffiliate } from "../extendType/TalkWithAffiliate";
import { TalkWithUser } from "../extendType/TalkWithUser";
import { InternalTalk } from "../firestore_schema/talks";

export type InternalTalkSlice = {
  internalTalks: InternalTalk[];
  internalTalkLoading: boolean;
  internalTalkUnsubscribe?: () => void;
  fetchInternalTalks: (shopId: string, staffId: string) => void;
  deleteInternalTalk: () => void;
  setInternalTalkLoading: (internalTalkLoading: boolean) => void;
  clearInternalTalks: () => void;
};
export type StaffTalkSlice = {
  staffTalks: TalkWithUser[];
  staffTalkLoading: boolean;
  staffTalkUnsubscribe?: () => void;
  fetchStaffTalks: (shopId: string, staffId: string) => void;
  deleteStaffTalk: () => void;
  setStaffTalkLoading: (staffTalkLoading: boolean) => void;
  clearStaffTalks: () => void;
};

export type TalkSlice = {
  userTalks: TalkWithAffiliate[];
  talkLoading: boolean;
  talkUnsubscribe?: () => void;
  fetchUserTalks: (userId: string) => void;
  deleteTalk: () => void;
  setTalkLoading: (talkLoading: boolean) => void;
  clearTalks: () => void;
};
