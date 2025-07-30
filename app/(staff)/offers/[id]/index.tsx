import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import useOffer from "@/hooks/useFetchOffer";
import React from "react";
import OfferDetailScreen from "@/screens/staff/offers/id";
import Loader from "@/components/common/Loader";
import firestore from "@react-native-firebase/firestore";
import { useOffersContext } from "@/contexts/staff/offers/OffersContext";
import { Alert } from "react-native";
import { useModal } from "@/contexts/ModalContext";

const OfferDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { offer, isLoading } = useOffer(id);
  const { showModal, hideModal } = useModal();
  const { archivedOffersMutate, publishedOffersMutate } = useOffersContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !offer) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "オファー情報が見つかりませんでした",
      });
      router.back();
    }
  }, [offer]);
  const handleEndOffer = async () => {
    try {
      showModal("処理中...");
      await firestore().collection("buyOffers").doc(id).update({
        status: "archived",
      });
      archivedOffersMutate();
      publishedOffersMutate();
      Toast.show({
        type: "success",
        text1: "該当オファーの掲載を終了しました",
      });
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      hideModal();
    }
  };

  const handleDeleteOffer = async () => {
    Alert.alert("掲載終了", "オファーの掲載を終了しますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "掲載終了",
        style: "destructive",
        onPress: handleEndOffer,
      },
    ]);
  };

  if (isLoading || !offer) return <Loader />;

  return (
    <OfferDetailScreen offer={offer} handleDeleteOffer={handleDeleteOffer} />
  );
};

export default OfferDetail;
