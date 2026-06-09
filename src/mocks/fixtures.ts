import { ATMListResponse, Card } from "../types/card";

export const cardFixture: Card = {
  id: "card-001",
  last4: "4242",
  status: "frozen",
  currency: "GBP",
  freezeReason: "suspicious_activity",
  dailyLimit: 50000,
  usedToday: 30000,
};

export const nearbyAtmsFixture: ATMListResponse = {
  atms: [
    {
      id: "atm-001",
      bank: "Barclays",
      address: "0 Cheapside",
      distanceMeters: 320,
      available: true,
      maxDispense: 30000,
      currencies: ["GBP"],
    },
    {
      id: "atm-002",
      bank: "HSBC",
      address: "1 King William St",
      distanceMeters: 650,
      available: true,
      maxDispense: 50000,
      currencies: ["GBP", "EUR"],
    },
    {
      id: "atm-003",
      bank: "NatWest",
      address: "5 Cannon St",
      distanceMeters: 890,
      available: false,
      maxDispense: 20000,
      currencies: ["GBP"],
    },
  ],
};
