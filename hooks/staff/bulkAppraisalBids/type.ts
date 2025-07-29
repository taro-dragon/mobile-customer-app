import { Bid } from "@/types/firestore_schema/bids";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";

export type ExBulkAppraisalBid = Bid & {
  bulkAppraisalRequests: BulkAppraisalRequest;
  car: Car;
};
