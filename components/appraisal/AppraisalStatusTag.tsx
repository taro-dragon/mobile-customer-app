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
  console.log(status);
  const label = {
    in_progress: "査定中",
    waiting_selection: "査定締切",
    finished: "査定完了",
  }[status];
  const color = {
    in_progress: "info",
    waiting_selection: "warning",
    finished: "success",
  }[status];
  return <Tag label={label} color={color as "info" | "warning" | "success"} />;
};

export default AppraisalStatusTag;
