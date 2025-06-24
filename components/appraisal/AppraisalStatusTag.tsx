import Tag from "../common/Tag";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";

type AppraisalStatusTagProps = {
  bulkAppraisalRequest?: BulkAppraisalRequest;
};

const AppraisalStatusTag: React.FC<AppraisalStatusTagProps> = ({
  bulkAppraisalRequest,
}) => {
  if (!bulkAppraisalRequest?.status) return null;
  const { status } = bulkAppraisalRequest;
  const label = {
    in_progress: "査定中",
    deadline: "査定締切",
    completed: "査定完了",
  }[status];
  return <Tag label={label} color="info" />;
};

export default AppraisalStatusTag;
