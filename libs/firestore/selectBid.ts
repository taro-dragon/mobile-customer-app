import { Bid } from "@/types/firestore_schema/bids";
import firestore from "@react-native-firebase/firestore";

const selectBid = async (bid: Bid, userId: string, carId: string) => {
  try {
    await firestore().runTransaction(async (transaction) => {
      const talkRef = firestore().collection("talks").doc();
      const targetBid = await transaction.get(
        firestore().collection("bids").doc(bid.id)
      );
      if (!targetBid.exists) {
        throw new Error("Bid not found");
      }
      transaction.update(targetBid.ref, {
        isSelected: true,
      });
      transaction.set(talkRef, {
        userId: userId,
        affiliateStoreId: bid.affiliateStoreId,
        sourceType: "buyOffer",
        sourceId: bid.id,
        carId: carId,
        status: "active",
        isArchived: false,
        lastMessage: "一括査定を選択しました",
        lastMessageAt: firestore.Timestamp.now(),
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default selectBid;
