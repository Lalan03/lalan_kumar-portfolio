import { LRUCache } from "lru-cache";

type Options = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export function rateLimit(options: Options) {
  const tokenCache = new LRUCache<string, number>({
    max: options.uniqueTokenPerInterval,
    ttl: options.interval,
  });

  return {
    check: (token: string, limit: number) =>
      new Promise<void>((resolve, reject) => {
        const current = tokenCache.get(token) ?? 0;
        tokenCache.set(token, current + 1);

        if (current + 1 > limit) {
          reject();
        } else {
          resolve();
        }
      }),
  };
}
