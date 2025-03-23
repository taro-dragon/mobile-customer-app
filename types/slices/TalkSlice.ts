import { TalkWithAffiliate } from "../extendType/TalkWithAffiliate";

export type TalkSlice = {
  talks: TalkWithAffiliate[];
  talkLoading: boolean;
  unsubscribe?: () => void;
  fetchUserTalks: (userId: string) => void;
  deleteTalk: () => void;
  setTalkLoading: (talkLoading: boolean) => void;
  clearTalks: () => void;
};
