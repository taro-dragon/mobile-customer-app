import fetchTalk from "@/libs/fetcher/staff/fetchTalk";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";

const useTalk = (): {
  talk: TalkWithUser | undefined;
  isTalkLoading: boolean;
  talkError: Error | null;
} => {
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const {
    data: talk,
    isLoading,
    error,
  } = useSWR(
    talkId ? `talk-${talkId}` : null,
    talkId ? () => fetchTalk(talkId) : null
  );
  return { talk, isTalkLoading: isLoading, talkError: error };
};

export default useTalk;
