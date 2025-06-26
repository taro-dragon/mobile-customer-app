import { TalkWithAffiliate } from "../extendType/TalkWithAffiliate";
import { TalkWithUser } from "../extendType/TalkWithUser";

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
  talks: TalkWithAffiliate[];
  talkLoading: boolean;
  unsubscribe?: () => void;
  fetchUserTalks: (userId: string) => void;
  deleteTalk: () => void;
  setTalkLoading: (talkLoading: boolean) => void;
  clearTalks: () => void;
};
