import { z } from "zod";

// 共通の数値フィールド用スキーマ（カスタムメッセージ対応）
const createNumberField = (message: string) =>
  z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ required_error: message }).min(1, message)
  );

// Main schema that includes all fields from all tabs
export const registrationStockSchema = z.object({
  // Basic info fields
  maker: z.string(),
  model: z.string(),
  year: z.string(),
  grade: z.string(),
  modelNumber: z.string(),
  front: z.string().min(1, "正面写真は必須です"),
  back: z.string().min(1, "背面写真は必須です"),
  left: z.string().min(1, "左側写真は必須です"),
  right: z.string().min(1, "右側写真は必須です"),
  interior: z.string().min(1, "内装写真は必須です"),
  firstRegistrationYear: z.union([
    z.string().min(1, "初年度登録年を選択してください"),
    z.number().min(1, "初年度登録年を選択してください"),
  ]),
  // Other photos are optional
  description: z
    .string({ required_error: "車両説明を入力してください" })
    .min(1, "車両説明を入力してください"),
  mileage: z
    .number({ required_error: "走行距離を入力してください" })
    .min(1, "走行距離を入力してください"),
  displacement: z
    .number({ required_error: "排気量を入力してください" })
    .min(1, "排気量を入力してください"),
  doorNumber: z.number().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().min(1, "ミッションを選択してください"),
  inspection: z.string().min(1, "車検を選択してください"),
  repairStatus: z.string().min(1, "修復歴を選択してください"),
  color: z.string().optional(),

  // Price fields
  bodyPrice: z
    .number({ required_error: "車両本体価格を入力してください" })
    .min(1, "車両本体価格を入力してください"),
  totalPayment: z
    .number({ required_error: "支払い総額を入力してください" })
    .min(1, "支払い総額を入力してください"),
  legalRepair: z.string().min(1, "法定整備を選択してください"),
  legalRepairDescription: z.string().optional(),

  // Guarantee fields
  guarantee: z.string().min(1, "保証有無を選択してください"),
  guaranteePeriod: z.number().optional(),
  guaranteeDistance: z.number().optional(),
  guaranteeContent: z.string().optional(),
  guaranteeCountSelect: z.string().optional(),
  guaranteeCount: z.number().optional(),
  guaranteeLimitSelect: z.string().optional(),
  guaranteeLimit: z.number().optional(),
  guaranteeExemptionSelect: z.string().optional(),
  guaranteeExemption: z.string().optional(),
  guaranteeRoadServiceSelect: z.string().optional(),
  guaranteeRoadService: z.string().optional(),

  // Options fields (most are boolean/checkbox)
  // Basic options
  airConditioner: z.boolean().optional(),
  powerSteering: z.boolean().optional(),
  powerWindow: z.boolean().optional(),
  driverAirbag: z.boolean().optional(),
  passengerAirbag: z.boolean().optional(),
  sideAirbag: z.boolean().optional(),
  abs: z.boolean().optional(),
  esc: z.boolean().optional(),

  // Additional options
  etc: z.boolean().optional(),
  theftPreventionSystem: z.boolean().optional(),
  collisionSafetyBody: z.boolean().optional(),
  collisionDamageReductionSystem: z.boolean().optional(),
  keylessEntry: z.boolean().optional(),
  smartKey: z.boolean().optional(),
  fourWheelDrive: z.boolean().optional(),
  idlingStop: z.boolean().optional(),

  // Car status options
  recordBook: z.boolean().optional(),
  nonSmokingCar: z.boolean().optional(),
  registeredUsedCar: z.boolean().optional(),
  rentalCar: z.boolean().optional(),
  exhibitionTestDriveCar: z.boolean().optional(),
  ecoCarTaxCar: z.boolean().optional(),
  oneOwnerCar: z.boolean().optional(),
  campingCar: z.boolean().optional(),
  welfareCar: z.boolean().optional(),

  // Control options
  cruiseControl: z.string().min(1, "クルーズコントロールを選択してください"),
  slideDoor: z.string().min(1, "スライドドアを選択してください"),
  electricRearGate: z.boolean().optional(),
  electricMirror: z.boolean().optional(),
  laneAssist: z.boolean().optional(),
  parkingAssist: z.boolean().optional(),
  autoParking: z.boolean().optional(),
  clearanceSonar: z.boolean().optional(),
  neckImpactReductionHeadrest: z.boolean().optional(),
  downhillAssistControl: z.boolean().optional(),

  // Light options
  ledHeadlamp: z.boolean().optional(),
  hid: z.boolean().optional(),
  autoLight: z.boolean().optional(),
  autoHighBeam: z.boolean().optional(),
  headlightWasher: z.boolean().optional(),

  // Exterior options
  sunroof: z.boolean().optional(),
  aero: z.boolean().optional(),
  roofRails: z.boolean().optional(),
  coldAreaSpecification: z.boolean().optional(),
  runFlatTire: z.boolean().optional(),
  airSuspension: z.boolean().optional(),
  centerDifferentialLock: z.boolean().optional(),
  turbo: z.boolean().optional(),
  superCharger: z.boolean().optional(),
  lowDown: z.boolean().optional(),
  liftUp: z.boolean().optional(),
  v100: z.boolean().optional(),

  // Seat options
  leatherSeat: z.boolean().optional(),
  halfLeatherSeat: z.boolean().optional(),
  powerSeat: z.boolean().optional(),
  ottoman: z.boolean().optional(),
  chipSeat: z.boolean().optional(),
  electricThirdSeat: z.boolean().optional(),
  benchSeat: z.boolean().optional(),
  threeRowSeat: z.boolean().optional(),
  fullFlatSeat: z.boolean().optional(),
  walkThrough: z.boolean().optional(),
  seatHeater: z.boolean().optional(),
  seatAirConditioner: z.boolean().optional(),

  // Entertainment options
  carNavi: z.string().min(1, "カーナビを選択してください"),
  tvMonitor: z.string().min(1, "TVモニタを選択してください"),
  cd: z.boolean().optional(),
  dvd: z.boolean().optional(),
  blueRay: z.boolean().optional(),
  md: z.boolean().optional(),
  cassette: z.boolean().optional(),
  musicServer: z.boolean().optional(),
  musicPlayer: z.boolean().optional(),
  usb: z.boolean().optional(),
  bluetooth: z.boolean().optional(),
  driveRecorder: z.boolean().optional(),
  frontCamera: z.boolean().optional(),
  sideCamera: z.boolean().optional(),
  backCamera: z.boolean().optional(),
  allAroundCamera: z.boolean().optional(),
  backSeatMonitor: z.boolean().optional(),

  // Manager fields
  managerStaffs: z.array(z.string()).min(1, "担当者を選択してください"),
});

// Simplified schema for draft saving (no required fields validation)
export const registrationStockDraftSchema = z.object({}).catchall(z.any());

// Types
export type RegistrationStockFormData = z.infer<typeof registrationStockSchema>;
