import { Year } from "./year";

export type Model = {
  modelId: string;
  name: string;
  detailLink: string;
  period: string;
  typeLink: string;
  group: string;
  years: Year[];
};
