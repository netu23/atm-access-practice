import { Card } from "../types/card";

export function formatCurrency(
  amountMinor: number,
  currency: Card["currency"]
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}
