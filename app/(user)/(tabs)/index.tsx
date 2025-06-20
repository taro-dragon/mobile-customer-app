import { useStore } from "@/hooks/useStore";
import UserIndexScreen from "@/screens/users/tabs";

const CustomerIndex = () => {
  const { cars } = useStore();
  const currentAppraisalCars = cars.filter(
    (car) => car.status === "in_progress" || car.status === "deadline"
  );
  return <UserIndexScreen currentAppraisalCars={currentAppraisalCars} />;
};

export default CustomerIndex;
