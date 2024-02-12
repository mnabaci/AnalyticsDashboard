"use-client";

import { BarChart, Card } from "@tremor/react";
import { AnalyticsDashboardProps } from "./types";
import { getNumberOfViews } from "@/utils";
import ReactCountryFlag from "react-country-flag";
import Badge from "../Badge";

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeSeriesPageViews,
  topCountries,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay.toFixed(1)}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="flex gap-2.5 items-center text-tremor-default text-dark-tremor-content">
            Visitors today
            <Badge
              percentage={(amtVisitorsToday / avgVisitorsPerDay - 1) * 100}
            />
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorsToday}
          </p>
        </Card>
      </div>
      {!!topCountries?.length && (
        <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
          <h2 className="w-full text-dark-tremor-content-strong text-center sm:text-left font-semibold text-xl">
            This weeks top visitors
          </h2>
          <div className="col-span3 flex items-center justify-between flex-wrap gap-8">
            {topCountries.map(([countryCode, number]) => {
              return (
                <div
                  key={`${countryCode}:${number}`}
                  className="flex items-center gap-3 text-dark-tremor-content-strong"
                >
                  <p className="hidden sm:block text-tremor-content">
                    {countryCode}
                  </p>
                  <ReactCountryFlag
                    className="text-5xl sm:text-3xl"
                    svg
                    countryCode={countryCode}
                  />
                  <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                    {number}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      )}
      <Card>
        {timeSeriesPageViews ? (
          <BarChart
            data={timeSeriesPageViews.map((day) => ({
              name: day.date,
              Visitors: getNumberOfViews([day]),
            }))}
            categories={["Visitors"]}
            index="name"
            showAnimation
            allowDecimals={false}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
