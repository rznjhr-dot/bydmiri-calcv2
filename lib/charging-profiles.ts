export interface ChargingProfiles {
  homeRate: number;
  dcRate: number;
  lastUpdated: string;
}

const CHARGING_URL = "https://bydmiri-data.netlify.app/data/charging.json";

function parseRate(str: string): number {
  const m = str.match(/RM(\d+\.?\d*)/);
  return m?.[1] ? parseFloat(m[1]) : 0.30;
}

function parseMaxDcRate(str: string): number {
  const nums = str.match(/RM(\d+\.?\d*)/g);
  if (nums) {
    const values = nums.map((n) => parseFloat(n.replace("RM", "")));
    return Math.max(...values);
  }
  return 1.40;
}

export async function fetchChargingProfiles(): Promise<ChargingProfiles> {
  const res = await fetch(CHARGING_URL);
  const data = await res.json();

  const homeRate = parseRate(data.electricityRate);
  const dcRate = parseMaxDcRate(data.dcTariffRange);

  return {
    homeRate,
    dcRate,
    lastUpdated: data.lastUpdated ?? "",
  };
}
