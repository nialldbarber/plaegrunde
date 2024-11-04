import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const STALE = {
  SECONDS: {
    ONE: 1000,
    TEN: 10 * 1000,
    THIRTY: 30 * 1000,
  },
  MINUTES: {
    ONE: 60 * 1000,
    FIVE: 5 * 60 * 1000,
    TEN: 10 * 60 * 1000,
    THIRTY: 30 * 60 * 1000,
  },
  HOURS: {
    ONE: 60 * 60 * 1000,
    TWO: 2 * 60 * 60 * 1000,
    THREE: 3 * 60 * 60 * 1000,
    TWELVE: 12 * 60 * 60 * 1000,
  },
  DAYS: {
    ONE: 24 * 60 * 60 * 1000,
    TWO: 2 * 24 * 60 * 60 * 1000,
    THREE: 3 * 24 * 60 * 60 * 1000,
    FIVE: 5 * 24 * 60 * 60 * 1000,
  },
  WEEKS: {
    ONE: 7 * 24 * 60 * 60 * 1000,
    TWO: 2 * 7 * 24 * 60 * 60 * 1000,
  },
  MONTHS: {
    ONE: 30 * 24 * 60 * 60 * 1000,
    TWO: 2 * 30 * 24 * 60 * 60 * 1000,
  },
  YEARS: {
    ONE: 365 * 24 * 60 * 60 * 1000,
  },
};
