export interface ChargingProfiles {
  /** Home AC rate, RM per kWh */
  homeRate: number;
  /** Public DC rate, RM per kWh */
  dcRate: number;
  lastUpdated: string;
}

const CHARGING_URL = "https://bydmiri-data.netlify.app/data/charging.json";

interface RawProfile {
  id: string;
  name: string;
  rate: number;
  unit: string;
  type: "ac" | "dc";
}

/**
 * The remote charging.json schema (2026-12) exposes a `chargingProfiles`
 * array. Home rate comes from the `home` profile; DC rate from
 * `public_default` (RM1.40/kWh per the remote data).
 */
export async function fetchChargingProfiles(): Promise<ChargingProfiles> {
  try {
    const res = await fetch(CHARGING_URL);
    const data = await res.json();

    const profiles: RawProfile[] = Array.isArray(data.chargingProfiles)
      ? data.chargingProfiles
      : [];

    const home = profiles.find((p) => p.id === "home");
    const dc = profiles.find((p) => p.id === "public_default");

    return {
      homeRate: typeof home?.rate === "number" ? home.rate : 0.33,
      dcRate: typeof dc?.rate === "number" ? dc.rate : 1.40,
      lastUpdated: data.lastUpdated ?? "",
    };
  } catch {
    // Network failure — sensible Sarawak defaults
    return { homeRate: 0.33, dcRate: 1.40, lastUpdated: "" };
  }
}
