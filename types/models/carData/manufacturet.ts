import { Model } from "./model";

export type Manufacture = {
  manufacturerId: string;
  name: string;
  country: string;
  detailLink: string;
  carModels: Model[];
};
