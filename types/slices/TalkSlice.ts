import { TalkWithAffiliate } from "../extendType/TalkWithAffiliate";
import { TalkWithUser } from "../extendType/TalkWithUser";

export type StaffTalkSlice = {
  staffTalks: TalkWithUser[];
  staffTalkLoading: boolean;
  staffTalkUnsubscribe?: () => void;
  fetchStaffTalks: (userId: string) => void;
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
