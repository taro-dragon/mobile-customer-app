import { useStore } from "@/hooks/useStore";
import UserIndexScreen from "@/screens/users/tabs";

const CustomerIndex = () => {
  const { cars, bulkAppraisalRequests } = useStore();
  const currentAppraisalRequests = bulkAppraisalRequests.filter(
    (request) =>
      request.status === "in_progress" || request.status === "deadline"
  );
  const currentAppraisalCars = cars.filter((car) => {
    const request = currentAppraisalRequests.find(
      (request) => request.carId === car.id
    );
    return request;
  });
  return (
    <UserIndexScreen
      currentAppraisalCars={currentAppraisalCars}
      currentAppraisalRequests={currentAppraisalRequests}
    />
  );
};

export default CustomerIndex;
