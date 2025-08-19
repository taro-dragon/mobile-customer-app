import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Manufacturer = {
  country: string;
  manufacturerId: string;
  name: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Model = {
  group?: string;
  modelId: string;
  name: string;
  period?: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Generation = {
  generationId: string;
  fullChangeName: string;
  fullChangePeriod?: string;
  fullChangeYear?: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type MinorModel = {
  minorChangeId: string;
  minorChangeName: string;
  minorChangePeriod?: string;
  minorChangeType?: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type GradeSpecs = {
  aiShift: string;
  comments: string;
  dimensions: string;
  doorCount: string;
  driveType: string;
  fourWheelSteering: string;
  grossVehicleWeight: string;
  groundClearance: string;
  interiorDimensions: string;
  manualMode: string;
  maxLoadCapacity: string;
  minTurningRadius: string;
  modelCode: string;
  optionColors: string;
  seatRows: string;
  seatingCapacity: string;
  standardColors: string;
  trackWidth: string;
  transmission: string;
  transmissionPosition: string;
  vehicleWeight: string;
  wheelbase: string;
};

export type Grade = {
  gradeId: string;
  gradeName: string;
  modelNumber: string;
  modelNumberLower: string;
  manufacturerId: string;
  modelId: string;
  generationId: string;
  fullChangeName: string;
  minorChangeId: string;
  minorChangeName: string;
  specs: GradeSpecs;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
