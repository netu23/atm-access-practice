export type CardStatus = "active" | "frozen" | "blocked" | "expired";
export type FreezeReason =
  | "user_initiated"
  | "suspicious_activity"
  | "compliance";

export interface Card {
  id: string;
  last4: string;
  status: CardStatus;
  dailyLimit: number;
  usedToday: number;
  currency: "GBP" | "EUR" | "USD";
  freezeReason?: FreezeReason;
}

export interface ATM {
  id: string;
  bank: string;
  address: string;
  distanceMeters: number;
  available: boolean;
  maxDispense: number;
  currencies: string[];
}

export interface ATMListResponse {
  atms: ATM[];
}
