import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Staff } from "./staff";

export type Stock = {
  id: string;
  // Basic info fields
  maker: string;
  model: string;
  year: string;
  grade: string;
  modelNumber: string;
  description: string;
  images: {
    front: string;
    back: string;
    left: string;
    right: string;
    interior: string;
  };
  mileage: number;
  displacement: number;
  doorNumber?: number;
  fuelType?: string;
  transmission: string;
  inspection: string;
  inspectionLimit: FirebaseFirestoreTypes.Timestamp;
  repairStatus: string;
  color?: string;
  firstRegistrationYear?: string | number;

  // Price fields
  bodyPrice: number;
  totalPayment: number;
  legalRepair: string;
  legalRepairDescription?: string;
  industrySales: string;

  // Guarantee fields
  guarantee: string;
  guaranteePeriod?: number;
  guaranteeDistance?: number;
  guaranteeContent?: string;
  guaranteeCountSelect?: string;
  guaranteeCount?: number;
  guaranteeLimitSelect?: string;
  guaranteeLimit?: number;
  guaranteeExemptionSelect?: string;
  guaranteeExemption?: string;
  guaranteeRoadServiceSelect?: string;
  guaranteeRoadService?: string;

  // Options fields
  airConditioner?: boolean;
  powerSteering?: boolean;
  powerWindow?: boolean;
  driverAirbag?: boolean;
  passengerAirbag?: boolean;
  sideAirbag?: boolean;
  abs?: boolean;
  esc?: boolean;
  etc?: boolean;
  theftPreventionSystem?: boolean;
  collisionSafetyBody?: boolean;
  collisionDamageReductionSystem?: boolean;
  keylessEntry?: boolean;
  smartKey?: boolean;
  fourWheelDrive?: boolean;
  idlingStop?: boolean;

  // Car status options
  recordBook?: boolean;
  nonSmokingCar?: boolean;
  registeredUsedCar?: boolean;
  rentalCar?: boolean;
  exhibitionTestDriveCar?: boolean;
  ecoCarTaxCar?: boolean;
  oneOwnerCar?: boolean;
  campingCar?: boolean;
  welfareCar?: boolean;

  // Control options
  cruiseControl: string;
  slideDoor: string;
  electricRearGate?: boolean;
  electricMirror?: boolean;
  laneAssist?: boolean;
  parkingAssist?: boolean;
  autoParking?: boolean;
  clearanceSonar?: boolean;
  neckImpactReductionHeadrest?: boolean;
  downhillAssistControl?: boolean;

  // Light options
  ledHeadlamp?: boolean;
  hid?: boolean;
  autoLight?: boolean;
  autoHighBeam?: boolean;
  headlightWasher?: boolean;

  // Exterior options
  sunroof?: boolean;
  aero?: boolean;
  roofRails?: boolean;
  coldAreaSpecification?: boolean;
  runFlatTire?: boolean;
  airSuspension?: boolean;
  centerDifferentialLock?: boolean;
  turbo?: boolean;
  superCharger?: boolean;
  lowDown?: boolean;
  liftUp?: boolean;
  v100?: boolean;

  // Seat options
  leatherSeat?: boolean;
  halfLeatherSeat?: boolean;
  powerSeat?: boolean;
  ottoman?: boolean;
  chipSeat?: boolean;
  electricThirdSeat?: boolean;
  benchSeat?: boolean;
  threeRowSeat?: boolean;
  fullFlatSeat?: boolean;
  walkThrough?: boolean;
  seatHeater?: boolean;
  seatAirConditioner?: boolean;

  // Entertainment options
  carNavi: string;
  tvMonitor: string;
  cd?: boolean;
  dvd?: boolean;
  blueRay?: boolean;
  md?: boolean;
  cassette?: boolean;
  musicServer?: boolean;
  musicPlayer?: boolean;
  usb?: boolean;
  bluetooth?: boolean;
  driveRecorder?: boolean;
  frontCamera?: boolean;
  sideCamera?: boolean;
  backCamera?: boolean;
  allAroundCamera?: boolean;
  backSeatMonitor?: boolean;

  // Firestore specific fields
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  createdBy: string;
  updatedBy: string;
  storeId: string;
  status: "draft" | "published" | "archived";

  // 店舗情報
  managerStaffs: string[];
};

// 新規作成時のデータ型（Firestoreの自動フィールドを除く）
export type CreateStockData = Omit<
  Stock,
  "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>;

// 更新時のデータ型（Firestoreの自動フィールドを除く）
export type UpdateStockData = Partial<
  Omit<Stock, "createdAt" | "updatedAt" | "createdBy" | "updatedBy">
>;
