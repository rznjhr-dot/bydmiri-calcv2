/** GA4 measurement and one shared event helper. */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-7EFNV0NK09";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function track(
  event: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}
