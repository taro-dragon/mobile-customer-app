import { ZipcodeRes } from "@/types/apiRes/zipcodeRes";

export const searchZipcode = async (
  postalCode: string
): Promise<ZipcodeRes> => {
  const response = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
  );
  const data = await response.json();
  return data;
};
