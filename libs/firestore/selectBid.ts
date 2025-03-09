import { Bid } from "@/types/firestore_schema/bids";
import firestore from "@react-native-firebase/firestore";

const selectBid = async (bid: Bid, userId: string) => {
  try {
    await firestore().runTransaction(async (transaction) => {
      const tolkRef = firestore().collection("tolks").doc();
      const targetBid = await transaction.get(
        firestore().collection("bids").doc(bid.id)
      );
      if (!targetBid.exists) {
        throw new Error("Bid not found");
      }
      transaction.update(targetBid.ref, {
        isSelected: true,
      });
      transaction.set(tolkRef, {
        userId: userId,
        affiliateStoreId: bid.affiliateStoreId,
        sourceType: "buyOffer",
        sourceId: bid.id,
        status: "active",
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default selectBid;
