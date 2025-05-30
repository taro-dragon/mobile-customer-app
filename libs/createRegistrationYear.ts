import dayjs from "dayjs";

// 年号を計算する関数
const getJapaneseEra = (year: number): string => {
  if (year >= 2019) {
    const reiwaYear = year - 2019 + 1;
    return reiwaYear === 1 ? "令和元年" : `R${reiwaYear}年`;
  } else if (year >= 1989) {
    const heiseiYear = year - 1989 + 1;
    return heiseiYear === 1 ? "平成元年" : `H${heiseiYear}年`;
  } else if (year >= 1926) {
    const showaYear = year - 1926 + 1;
    return showaYear === 1 ? "昭和元年" : `S${showaYear}年`;
  } else {
    return `${year}年`;
  }
};

const createRegistrationYear = () => {
  const currentYear = dayjs().year();
  const registrationYear = [];
  for (let year = currentYear; year >= 1980; year--) {
    registrationYear.push({
      label: `${year}年(${getJapaneseEra(year)})`,
      value: year,
    });
  }
  return registrationYear;
};

export default createRegistrationYear;
