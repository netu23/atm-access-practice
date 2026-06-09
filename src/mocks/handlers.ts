import { rest } from "msw";
import { cardFixture, nearbyAtmsFixture } from "./fixtures";

export const handlers = [
  rest.get("/api/card/card-001", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(cardFixture));
  }),

  rest.post("/api/card/card-001/unfreeze", (_req, res, ctx) => {
    return res(ctx.delay(800), ctx.status(200), ctx.json({ success: true }));
  }),

  rest.get("/api/atm/nearby", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(nearbyAtmsFixture));
  }),
];
