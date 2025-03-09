import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Car } from "@/types/models/Car";

const isTargetOffer = (cars: Car[], offer: BuyOffer) => {
  const { maker, model, year, grade } = offer;
  const targetCar = cars.find(
    (car) =>
      car.maker === maker &&
      car.model === model &&
      car.year === year &&
      car.grade === grade
  );
  return targetCar;
};

export default isTargetOffer;
