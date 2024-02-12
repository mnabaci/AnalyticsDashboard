import { format, subDays } from "date-fns";
import { AnalyticsData } from "./analytics";

export const dateFormat = "dd/MM/yyyy";
export const getDate = (sub: number = 0) => {
  const dateXDaysAge = subDays(new Date(), sub);
  return format(dateXDaysAge, dateFormat);
};

export const getNumberOfViews = (data: AnalyticsData[]) =>
  data
    .map((v) => v.events)
    .flatMap((e) => e)
    .map((e) => Object.values(e)[0]!)
    .reduce((acc, curr) => acc + curr, 0);

export const getCountries = (data: AnalyticsData[]) => {
  const countriesMap = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    const day = data[i];
    if (!day) continue;

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j];
      if (!event) continue;

      const key = Object.keys(event)[0]!;
      const value = Object.values(event)[0]!;

      const parsedKey = JSON.parse(key);

      const country = parsedKey?.country;

      if (!country) continue;

      if (countriesMap.has(country)) {
        const prevVal = countriesMap.get(country)!;
        countriesMap.set(country, prevVal + value);
      } else {
        countriesMap.set(country, value);
      }
    }
  }

  return countriesMap;
};
