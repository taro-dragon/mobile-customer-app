import { useStore } from "@/hooks/useStore";
import CreateTalkIndexScreen from "@/screens/staff/createTalk";

const CreateTalkIndex = () => {
  const { currentStoreStaffs, staff } = useStore();
  const staffs = currentStoreStaffs?.filter(
    (currentStoreStaff) => currentStoreStaff.id !== staff?.id
  );
  return <CreateTalkIndexScreen staffs={staffs} />;
};

export default CreateTalkIndex;
