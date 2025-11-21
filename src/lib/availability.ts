import availability from "../../data/availability.json";

type AvailabilityRange = { start: string; end: string };

type NormalizedRange = { start: Date; end: Date };

const parsed: NormalizedRange[] = (availability as AvailabilityRange[]).map((range) => ({
  start: parseDate(range.start),
  end: parseDate(range.end)
}));

export function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
}

export function formatDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function isDateBlocked(date: Date): boolean {
  return parsed.some((range) => date >= range.start && date <= range.end);
}

export function isRangeAvailable(start: Date, end: Date): boolean {
  if (!(start && end)) return false;
  if (end <= start) return false;

  return !parsed.some((range) => start <= range.end && end >= range.start);
}

export function nextAvailableDate(from: Date): Date {
  const sorted = [...parsed].sort((a, b) => a.start.getTime() - b.start.getTime());
  let candidate = stripTime(from);

  for (const range of sorted) {
    if (candidate >= range.start && candidate <= range.end) {
      candidate = addDays(range.end, 1);
    }
  }

  return candidate;
}

export function stripTime(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

export function addDays(value: Date, amount: number): Date {
  const date = new Date(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return date;
}

export function expandRange(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  let cursor = stripTime(start);
  const target = stripTime(end);

  while (cursor <= target) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return days;
}

export const blockedRanges = parsed;
