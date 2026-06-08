import { CardStatus } from "./components/CardStatus/CardStatus";
import { ATMList } from "./components/ATMList/ATMList";
import { useCardActions } from "./hooks/useCardActions";
import { useFetch } from "./hooks/useFetch";
import { AsyncState } from "./types/async";
import { Card } from "./types/card";
import styles from "./App.module.css";

function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

function renderCardState(
  cardState: AsyncState<Card>,
  onUnfreeze: () => Promise<void>,
  isUnfreezing: boolean
) {
  switch (cardState.status) {
    case "idle":
    case "loading":
    case "error":
      // TODO: Render loading skeleton and error message using AsyncState
      return null;
    case "success":
      return (
        <CardStatus
          card={cardState.data}
          isUnfreezing={isUnfreezing}
          onUnfreeze={onUnfreeze}
        />
      );
    default:
      return assertNever(cardState);
  }
}

function App() {
  const cardState = useFetch<Card>("/api/card/card-001");
  const { unfreezeCard, unfreezeState } = useCardActions("card-001");

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Support dashboard</p>
        <h1 className={styles.title}>ATM card access</h1>
      </header>
      <div className={styles.grid}>
        {renderCardState(
          cardState,
          unfreezeCard,
          unfreezeState.status === "loading"
        )}
        <ATMList />
      </div>
    </main>
  );
}

export default App;
