import { AnalyticsData } from "@/utils/analytics";

export interface AnalyticsDashboardProps {
  avgVisitorsPerDay: number;
  amtVisitorsToday: number;
  timeSeriesPageViews: AnalyticsData[];
  topCountries: [string, number][];
}
