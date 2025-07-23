import { ZipcodeRes } from "@/types/apiRes/zipcodeRes";

export const searchZipcode = async (
  postalCode: string
): Promise<ZipcodeRes> => {
  try {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("郵便番号の取得に失敗しました");
  }
};
