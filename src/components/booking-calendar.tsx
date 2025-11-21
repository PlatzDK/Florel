"use client";

import { useEffect, useMemo, useState } from "react";
import { blockedRanges, expandRange, formatDate, nextAvailableDate, parseDate, stripTime } from "@/lib/availability";
import { estimatePrice, formatCurrency } from "@/lib/pricing";

type Props = {
  onChange: (value: { arrival: string | null; departure: string | null }) => void;
  arrival?: string;
  departure?: string;
};

const dayLabels = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
const monthLabels = [
  "januar",
  "februar",
  "marts",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "december"
];

export function BookingCalendar({ onChange, arrival, departure }: Props): JSX.Element {
  const today = stripTime(new Date());
  const initialMonth = parseMonthFromSelection(arrival, departure) ?? today;
  const [month, setMonth] = useState<Date>(new Date(initialMonth));
  const [startDate, setStartDate] = useState<string | null>(arrival ?? null);
  const [endDate, setEndDate] = useState<string | null>(departure ?? null);

  const disabledDates = useMemo(() => expandBlockedDates(), []);

  const price = useMemo(() => {
    if (!startDate || !endDate) return null;
    return estimatePrice(parseDate(startDate), parseDate(endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    onChange({ arrival: startDate, departure: endDate });
  }, [startDate, endDate, onChange]);

  const weeks = useMemo(() => buildCalendar(month), [month]);

  const handleDayClick = (date: Date) => {
    const dateKey = formatDate(date);
    if (isDisabled(date, today, disabledDates)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateKey);
      setEndDate(null);
      maybeJumpMonth(date, setMonth, month);
      return;
    }

    const currentStart = parseDate(startDate);
    if (date <= currentStart) {
      setStartDate(dateKey);
      setEndDate(null);
      maybeJumpMonth(date, setMonth, month);
      return;
    }

    setEndDate(dateKey);
  };

  const highlightDates = useMemo(() => {
    if (!startDate) return [];
    const start = parseDate(startDate);
    const end = endDate ? parseDate(endDate) : start;
    return expandRange(start, end);
  }, [startDate, endDate]);

  const goToNextAvailable = () => {
    const startFrom = startDate ? parseDate(startDate) : today;
    const next = nextAvailableDate(startFrom);
    setMonth(new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth(), 1)));
    setStartDate(formatDate(next));
    setEndDate(null);
  };

  return (
    <div className="space-y-4" aria-label="Vælg ankomst og afrejse">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm text-primary">
          <button
            type="button"
            onClick={() => setMonth(addMonths(month, -1))}
            className="rounded-full px-3 py-2 transition hover:bg-primary/10"
            aria-label="Forrige måned"
          >
            ←
          </button>
          <p className="font-semibold">
            {monthLabels[month.getUTCMonth()]} {month.getUTCFullYear()}
          </p>
          <button
            type="button"
            onClick={() => setMonth(addMonths(month, 1))}
            className="rounded-full px-3 py-2 transition hover:bg-primary/10"
            aria-label="Næste måned"
          >
            →
          </button>
        </div>
        <button
          type="button"
          onClick={goToNextAvailable}
          className="text-sm font-semibold text-primary underline"
        >
          Find første ledige dato
        </button>
        {price && (
          <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-primary">
            Estimeret pris ({price.nights} nætter): {formatCurrency(price.total)} ({price.tier.name})
          </div>
        )}
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-primary/60">
          {dayLabels.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {weeks.map((week, weekIndex) =>
            week.map((date, dayIndex) => {
              if (!date) {
                return <div key={`empty-${weekIndex}-${dayIndex}`} />;
              }

              const dateKey = formatDate(date);
              const blocked = isDisabled(date, today, disabledDates);
              const selectedStart = startDate === dateKey;
              const selectedEnd = endDate === dateKey;
              const inRange = highlightDates.some((d) => formatDate(d) === dateKey);

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => handleDayClick(date)}
                  disabled={blocked}
                  aria-pressed={selectedStart || selectedEnd}
                  aria-label={`${date.getUTCDate()}. ${monthLabels[date.getUTCMonth()]} ${date.getUTCFullYear()}`}
                  className={`relative h-11 rounded-lg border text-center transition ${
                    blocked
                      ? "cursor-not-allowed border-dashed border-primary/20 text-primary/30"
                      : "border-transparent hover:border-primary/30 hover:bg-primary/5"
                  } ${selectedStart || selectedEnd ? "bg-primary text-white hover:bg-primary" : ""} ${
                    inRange && !selectedStart && !selectedEnd ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  {selectedStart && <span className="sr-only">Ankomst</span>}
                  {selectedEnd && <span className="sr-only">Afrejse</span>}
                  <span className="inline-block align-middle">{date.getUTCDate()}</span>
                  {blocked && <span className="absolute inset-x-2 bottom-1 block h-1 rounded-full bg-primary/30" aria-hidden />}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-primary/70">
        <div className="flex items-center gap-2">
          <span className="block h-4 w-4 rounded bg-primary/10" aria-hidden />
          <span>Valgt periode</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block h-4 w-4 rounded border border-dashed border-primary/30" aria-hidden />
          <span>Optaget</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block h-4 w-4 rounded bg-primary" aria-hidden />
          <span>Ankomst/Afrejse</span>
        </div>
      </div>
    </div>
  );
}

function buildCalendar(month: Date): (Date | null)[][] {
  const start = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
  const startWeekday = (start.getUTCDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();

  const days: (Date | null)[] = Array(startWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), day)));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

function isDisabled(date: Date, today: Date, disabledDates: Set<string>): boolean {
  const key = formatDate(date);
  return disabledDates.has(key) || date < today;
}

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  return newDate;
}

function maybeJumpMonth(date: Date, update: (value: Date) => void, current: Date): void {
  const sameMonth =
    date.getUTCFullYear() === current.getUTCFullYear() && date.getUTCMonth() === current.getUTCMonth();
  if (!sameMonth) {
    update(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)));
  }
}

function parseMonthFromSelection(arrival?: string, departure?: string): Date | null {
  if (arrival) return parseDate(arrival);
  if (departure) return parseDate(departure);
  return null;
}

function expandBlockedDates(): Set<string> {
  const blocked = new Set<string>();
  blockedRanges.forEach((range) => {
    expandRange(range.start, range.end).forEach((date) => blocked.add(formatDate(date)));
  });
  return blocked;
}
