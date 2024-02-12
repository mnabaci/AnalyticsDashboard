import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getCountries, getDate, getNumberOfViews } from "@/utils";
import { analytics } from "@/utils/analytics";

const TRACKING_DAYS = 7;

const Page = async () => {
  const pageViews = await analytics.retrieveDays("pageview", TRACKING_DAYS);

  const totalPageViews = getNumberOfViews(pageViews);

  const amtVisitorsToday = getNumberOfViews(
    pageViews.filter((v) => v.date === getDate())
  );

  const countries: Map<string, number> = getCountries(pageViews);

  const topCountries = [...countries.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1;
      else return 1;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={totalPageViews / TRACKING_DAYS}
          amtVisitorsToday={amtVisitorsToday}
          timeSeriesPageViews={pageViews}
          topCountries={topCountries}
        />
      </div>
    </div>
  );
};

export default Page;
