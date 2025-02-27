import { useBulkAppraisal } from "@/hooks/useBulkAppraisal";
import Tag from "../common/Tag";

const AppraisalStatusTag = () => {
  const { currentRequest } = useBulkAppraisal();
  if (!currentRequest?.status) return null;
  const { status } = currentRequest;
  const label = {
    in_progress: "査定中",
    deadline: "査定締切",
    completed: "査定完了",
  }[status];
  return <Tag label={label} color="info" />;
};

export default AppraisalStatusTag;
