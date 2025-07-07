import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Staff } from "@/types/firestore_schema/staff";

const useFetchStaffName = (staffId: string) => {
  const [staffName, setStaffName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!staffId) return;

    const fetchStaffName = async () => {
      try {
        setIsLoading(true);
        const staffSnapshot = await firestore()
          .collection("staffs")
          .doc(staffId)
          .get();

        if (staffSnapshot.exists()) {
          const staffData = staffSnapshot.data() as Staff;
          setStaffName(staffData.name);
        } else {
          setStaffName("不明なスタッフ");
        }
      } catch (error) {
        console.error("スタッフ名取得エラー:", error);
        setStaffName("不明なスタッフ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffName();
  }, [staffId]);

  return { staffName, isLoading };
};

export default useFetchStaffName;
