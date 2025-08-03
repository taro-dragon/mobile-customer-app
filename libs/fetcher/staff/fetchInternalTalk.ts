import { InternalTalk } from "@/types/firestore_schema/talks";
import firestore from "@react-native-firebase/firestore";

const fetchInternalTalk = async (shopId: string, talkId: string) => {
  try {
    const talk = await firestore()
      .collection("shops")
      .doc(shopId)
      .collection("talks")
      .doc(talkId)
      .get();
    const talkData = {
      ...talk.data(),
      id: talk.id,
    };
    return talkData as InternalTalk;
  } catch (error) {
    throw error;
  }
};

export default fetchInternalTalk;
