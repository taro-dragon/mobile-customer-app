import { useStore } from "@/hooks/useStore";
import UserIndexScreen from "@/screens/users/tabs";

const CustomerIndex = () => {
  const { cars, bulkAppraisalRequests } = useStore();
  console.log(JSON.stringify(bulkAppraisalRequests, null, 2));

  const currentAppraisalCars = cars.filter(
    (car) => car.status === "in_progress" || car.status === "deadline"
  );
  return <UserIndexScreen currentAppraisalCars={currentAppraisalCars} />;
};

export default CustomerIndex;
