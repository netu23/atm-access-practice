import { rest } from "msw";
import { ATMListResponse, Card } from "../types/card";

const card: Card = {
  id: "card-001",
  last4: "4242",
  status: "frozen",
  currency: "GBP",
  freezeReason: "suspicious_activity",
  dailyLimit: 50000,
  usedToday: 30000,
};

const nearbyAtms: ATMListResponse = {
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

export const handlers = [
  rest.get("/api/card/card-001", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(card));
  }),

  rest.post("/api/card/card-001/unfreeze", (_req, res, ctx) => {
    return res(ctx.delay(800), ctx.status(200), ctx.json({ success: true }));
  }),

  rest.get("/api/atm/nearby", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(nearbyAtms));
  }),
];
