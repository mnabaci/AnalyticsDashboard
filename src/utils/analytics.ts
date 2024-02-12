import { redis } from "@/lib/redis";
import { dateFormat, getDate } from ".";
import { parse } from "date-fns";

type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  persist?: boolean;
};

type KeyOptions = { date?: string } & Pick<TrackOptions, "persist">;

type AnalyticsNameSpace = "pageview" | "export";

type AnalyticsResponse = Record<string, string>;

export type AnalyticsData = { date: string; events: AnalyticsEvent[] };
type AnalyticsEvent = { [key: string]: number };

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;
  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  private getKey(namespace: AnalyticsNameSpace, opts?: KeyOptions) {
    let key = `analytics::${namespace}`;

    if (!opts?.persist && !opts?.date) key += `::${getDate()}`;

    if (opts?.date) key += `::${opts.date}`;

    return key;
  }

  async track(
    namespace: AnalyticsNameSpace,
    event: object = {},
    opts?: TrackOptions
  ) {
    const key = this.getKey(namespace, opts);

    await redis.hincrby(key, JSON.stringify(event), 1);

    if (!opts?.persist) await redis.expire(key, this.retention);
  }

  async retrieveDays(
    namespace: AnalyticsNameSpace,
    nDays: number
  ): Promise<AnalyticsData[]> {
    const promises: Promise<AnalyticsData>[] = [];
    for (let i = 0; i < nDays; i++)
      promises.push(this.retrieve(namespace, getDate(i)));

    const res = await Promise.all(promises);

    return res.sort((a, b) => {
      if (
        parse(a.date, dateFormat, new Date()) >
        parse(b.date, dateFormat, new Date())
      )
        return 1;
      else return -1;
    });
  }

  async retrieve(
    namespace: AnalyticsNameSpace,
    date: string
  ): Promise<AnalyticsData> {
    const key = this.getKey(namespace, { date });
    const res = await redis.hgetall<AnalyticsResponse>(key);

    return {
      date,
      events: Object.entries(res ?? []).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
  }
}

export const analytics = new Analytics();
