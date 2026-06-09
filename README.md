# ATM Access Practice

This is a Create React App + TypeScript practice repository based on a fintech-style frontend interview scenario. It starts as a partially built support dashboard for a customer whose card was declined at an ATM.

The project is intentionally incomplete. Your job during practice is to read the existing code, write tests first where useful, then finish the missing behavior without changing the tech stack.

## StackBlitz

Push this repository to GitHub, then import it in StackBlitz using the repository URL. StackBlitz should detect the CRA scripts and run `npm start`.

## Scenario

A support agent can see:

- A card ending in `4242`
- The card status, currency, and freeze reason
- A button to unfreeze the card
- Nearby ATMs mocked through MSW

The mock API data lives in [src/mocks/handlers.ts](src/mocks/handlers.ts).

In StackBlitz WebContainers, the app falls back to a tiny development-only
`fetch` mock because WebContainers cannot register a project-owned Service
Worker. Local development and Jest still use MSW.

## Practice Tasks

Start with the tests in [src/App.test.tsx](src/App.test.tsx). The TODOs describe the expected behavior.

1. Make `useFetch` handle non-OK HTTP responses.
2. Render useful loading and error UI in `App`.
3. Disable the unfreeze button while the POST request is in-flight.
4. Update the displayed card status after a successful unfreeze.
5. Hide the unfreeze button when `freezeReason` is `compliance`.
6. Add daily limit progress UI using `formatCurrency`.
7. Implement `formatDistance`.
8. Improve each ATM item with distance, max dispense, and unavailable state.

## Constraints

- Create React App with TypeScript, not Vite
- Jest + React Testing Library only
- MSW v1 for API mocks
- CSS Modules only
- Native `fetch()` only
- No `any` types
- No `try-catch`; use `response.ok` checks
- Prefer discriminated unions for async state
- Keep components small and readable

## Scripts

```bash
npm start
npm test
npm run build
```

## Useful Starting Points

- [src/hooks/useFetch.ts](src/hooks/useFetch.ts)
- [src/hooks/useCardActions.ts](src/hooks/useCardActions.ts)
- [src/components/CardStatus/CardStatus.tsx](src/components/CardStatus/CardStatus.tsx)
- [src/components/ATMList/ATMItem.tsx](src/components/ATMList/ATMItem.tsx)
- [src/App.tsx](src/App.tsx)
