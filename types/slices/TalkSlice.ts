import { TalkWithAffiliate } from "../extendType/TalkWithAffiliate";

export type StaffTalkSlice = {
  staffTalks: TalkWithAffiliate[];
  staffTalkLoading: boolean;
  staffUnsubscribe?: () => void;
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
