import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import App from "./App";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("shows frozen card status with unfreeze button", () => {
  // TODO (TDD): Write this test BEFORE implementing the unfreeze flow
  // Steps:
  // 1. render(<App />)
  // 2. wait for card data to load
  // 3. assert status badge shows "frozen"
  // 4. assert "Unfreeze Card" button is present
});

it("updates card status to active after successful unfreeze", () => {
  // TODO (TDD): Write this test BEFORE implementing the state update
  // Steps:
  // 1. render(<App />)
  // 2. wait for card to load
  // 3. click "Unfreeze Card"
  // 4. assert button is disabled during in-flight
  // 5. assert status badge updates to "active" after response
});

it("hides unfreeze button when freezeReason is compliance", () => {
  // TODO (TDD): Override MSW handler to return freezeReason: "compliance"
  // Assert the button is not rendered
  // Assert the compliance message is shown instead
});

void render;
void screen;
void userEvent;
void rest;
