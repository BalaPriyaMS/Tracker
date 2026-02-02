import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number,
  currency = "INR",
  locale = "en-IN"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};
