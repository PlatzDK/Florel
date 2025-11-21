import pricing from "../../data/pricing.json";
import { addDays, stripTime } from "./availability";

type PricingTier = {
  name: string;
  period: string;
  price: string;
  weeklyRate: number;
  nightlyRate: number;
};

type PriceQuote = {
  nights: number;
  total: number;
  tier: PricingTier;
};

const seasonByMonth: Record<number, string> = {
  0: "Lavsæson",
  1: "Lavsæson",
  2: "Lavsæson",
  3: "Mellemsæson",
  4: "Mellemsæson",
  5: "Mellemsæson",
  6: "Højsæson",
  7: "Højsæson",
  8: "Mellemsæson",
  9: "Mellemsæson",
  10: "Lavsæson",
  11: "Lavsæson"
};

export function estimatePrice(arrival: Date, departure: Date): PriceQuote | null {
  const start = stripTime(arrival);
  const end = stripTime(departure);
  if (end <= start) return null;

  const nights = countNights(start, end);
  const tierName = seasonByMonth[start.getUTCMonth()];
  const tier = (pricing as PricingTier[]).find((item) => item.name === tierName);
  if (!tier) return null;

  const weeks = Math.floor(nights / 7);
  const remainingNights = nights % 7;
  const total = weeks * tier.weeklyRate + remainingNights * tier.nightlyRate;

  return { nights, total, tier };
}

function countNights(start: Date, end: Date): number {
  let nights = 0;
  let cursor = stripTime(start);

  while (cursor < end) {
    nights += 1;
    cursor = addDays(cursor, 1);
  }

  return nights;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK", maximumFractionDigits: 0 }).format(amount);
}
