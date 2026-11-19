import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Amounts are stored in pence. Unpaid orders have no total yet.
export function formatGBP(pence?: number | null) {
  if (typeof pence !== "number" || Number.isNaN(pence)) return "Awaiting payment";
  return `£${(pence / 100).toFixed(2)}`;
}
