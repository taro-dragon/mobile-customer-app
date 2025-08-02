import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/registrationCar/form/TextInput";
import TakePhoto from "@/components/staff/createTalk/TakePhoto";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";

import { FormValues } from "./_layout";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { useModal } from "@/contexts/ModalContext";

const TalkSettingScreen = () => {
  const navigation = useNavigation();
  const { colors, typography } = useTheme();
  const { currentStoreStaffs, staff, currentStore } = useStore();
  const { handleSubmit, watch } = useFormContext<FormValues>();
  const { showModal, hideModal } = useModal();
  const targetStaffIds = watch("staffIds");
  const staffIds = [...targetStaffIds, staff?.id];

  const staffs = currentStoreStaffs?.filter((staff) =>
    staffIds.includes(staff.id)
  );

  const onSubmit = async (data: FormValues) => {
    const { talkName, talkPhoto } = data;
    showModal("作成中...");
    let photoUrl;
    try {
      if (talkPhoto) {
        const imageRef = storage()
          .ref()
          .child(`/shops/${currentStore?.id}/talks/${talkName}.jpg`);
        await imageRef.putFile(talkPhoto);
        const downloadURL = await imageRef.getDownloadURL();
        photoUrl = downloadURL;
      }

      const submitData: {
        name: string;
        staffIds: (string | undefined)[];
        createdAt: FirebaseFirestoreTypes.Timestamp;
        updatedAt: FirebaseFirestoreTypes.Timestamp;
        lastMessage: string;
        photoUrl?: string;
      } = {
        name: talkName,
        staffIds: staffIds,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
        lastMessage: "トークを作成しました",
      };
      if (photoUrl) {
        submitData.photoUrl = photoUrl;
      }
      await firestore().runTransaction(async (transaction) => {
        const talkRef = firestore()
          .collection("shops")
          .doc(currentStore?.id)
          .collection("talks")
          .doc();
        const messageRef = firestore()
          .collection("shops")
          .doc(currentStore?.id)
          .collection("talks")
          .doc(talkRef.id)
          .collection("messages")
          .doc();
        await transaction.set(talkRef, submitData);
        await transaction.set(messageRef, {
          text: "トークを作成しました",
          senderId: "system",
          type: "system",
          createdAt: firestore.Timestamp.now(),
          updatedAt: firestore.Timestamp.now(),
        });
      });

      Toast.show({
        type: "success",
        text1: "作成しました",
      });
      navigation.getParent()?.goBack();
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "エラーが発生しました",
      });
    } finally {
      hideModal();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, gap: 24, flex: 1 }}
        >
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TakePhoto name="talkPhoto" label="トーク写真" />
              <View style={{ flex: 1 }}>
                <TextInput isRequired label="トーク名" name="talkName" />
              </View>
            </View>
          </View>
          <FlatList
            data={staffs}
            contentContainerStyle={{ gap: 12 }}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  {item.profileImageUrl ? (
                    <Image
                      source={{ uri: item.profileImageUrl }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: colors.backgroundSecondary,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <User size={24} color={colors.textSecondary} />
                    </View>
                  )}
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        color: colors.textPrimary,
                        ...typography.heading3,
                      }}
                    >
                      {item.name}
                    </Text>
                    {item.position && (
                      <Text
                        style={{
                          color: colors.textSecondary,
                          ...typography.body2,
                        }}
                      >
                        {item.position}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Divider />
        <View style={{ padding: 16 }}>
          <Button
            label="作成"
            onPress={handleSubmit(onSubmit)}
            color={colors.primary}
          />
        </View>
        <SafeAreaBottom />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default TalkSettingScreen;
