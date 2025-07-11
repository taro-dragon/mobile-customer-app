import EditStaffScreen from "@/screens/staff/staff/editStaff";
import { FormProvider, useForm } from "react-hook-form";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetchStaff from "@/hooks/staff/useFetchStaff";
import { useStore } from "@/hooks/useStore";
import { useMemo } from "react";

type InitialValues = {
  name: string;
  furigana: string;
  email: string;
  phoneNumber: string;
  employeeId: string;
  isOwner: boolean;
  position: string;
  profileImageUrl?: string;
  shops?: string[];
};

const StaffEdit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { staff: currentStaff } = useStore();
  const { staff: targetStaff } = useFetchStaff(id);
  const router = useRouter();
  const isCurrentStaff = useMemo(
    () => currentStaff?.id === id,
    [currentStaff, id]
  );
  const form = useForm<InitialValues>({
    defaultValues: {
      name: targetStaff?.name ?? "",
      furigana: targetStaff?.furigana ?? "",
      email: targetStaff?.email ?? "",
      phoneNumber: targetStaff?.phoneNumber ?? "",
      employeeId: targetStaff?.employeeId ?? "",
      isOwner: targetStaff?.isOwner ?? false,
      position: targetStaff?.position ?? "",
      profileImageUrl: targetStaff?.profileImageUrl ?? "",
      shops: targetStaff?.shops ?? [],
    },
  });
  const { handleSubmit } = form;
  const onSubmit = async (data: InitialValues) => {
    try {
      const { profileImageUrl, email, phoneNumber, ...rest } = data;
      const currentProfileImageUrl = targetStaff?.profileImageUrl;

      // staffドキュメントの更新データを準備（emailとphoneNumberを除く）
      const staffData = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== undefined)
      );

      // privateDataサブコレクションの更新データを準備
      const privateData: { email?: string; phoneNumber?: string } = {};
      if (email !== undefined) privateData.email = email;
      if (phoneNumber !== undefined) privateData.phoneNumber = phoneNumber;

      const staffRef = firestore().collection("staffs").doc(id);
      const privateDataRef = staffRef.collection("privateData").doc(id);

      if (currentProfileImageUrl !== profileImageUrl) {
        if (profileImageUrl) {
          const storageRef = storage().ref();
          const profileImageRef = storageRef.child(
            `staff/${id}/profileImage.jpg`
          );
          await profileImageRef.putFile(profileImageUrl);
          const profileImageUrlResult = await profileImageRef.getDownloadURL();

          if (currentProfileImageUrl && currentProfileImageUrl !== "") {
            try {
              const oldImageRef = storage().refFromURL(currentProfileImageUrl);
              await oldImageRef.delete();
            } catch (deleteError) {
              console.warn("古い画像の削除に失敗しました:", deleteError);
            }
          }

          await staffRef.update({
            ...staffData,
            profileImageUrl: profileImageUrlResult,
          });
        } else {
          if (currentProfileImageUrl && currentProfileImageUrl !== "") {
            try {
              const oldImageRef = storage().refFromURL(currentProfileImageUrl);
              await oldImageRef.delete();
            } catch (deleteError) {
              console.warn("古い画像の削除に失敗しました:", deleteError);
            }
          }

          await staffRef.update({
            ...staffData,
            profileImageUrl: "",
          });
        }
      } else {
        if (Object.keys(staffData).length > 0) {
          await staffRef.update(staffData);
        }
      }

      if (Object.keys(privateData).length > 0) {
        await privateDataRef.set(privateData, { merge: true });
      }

      router.back();
      Toast.show({
        type: "success",
        text1: "スタッフを更新しました",
      });
    } catch (error) {
      console.error("スタッフ更新エラー:", error);
      Toast.show({
        type: "error",
        text1: "スタッフの更新に失敗しました",
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <EditStaffScreen
        onSubmit={handleSubmit(onSubmit)}
        isOwner={!!currentStaff?.isOwner}
        isCurrentStaff={!!isCurrentStaff}
      />
    </FormProvider>
  );
};

export default StaffEdit;
