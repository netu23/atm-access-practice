import { Card } from "../../types/card";
import styles from "./CardStatus.module.css";

interface CardStatusProps {
  card: Card;
  isUnfreezing: boolean;
  onUnfreeze: () => Promise<void>;
}

export function CardStatus({
  card,
  isUnfreezing,
  onUnfreeze,
}: CardStatusProps) {
  return (
    <section className={styles.panel} aria-labelledby="card-status-heading">
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Card</p>
          <h2 id="card-status-heading" className={styles.cardNumber}>
            {"\u2022\u2022\u2022\u2022"} {card.last4}
          </h2>
        </div>
        <span className={styles.currency}>{card.currency}</span>
      </div>

      <div className={styles.statusRow}>
        <span className={styles.statusLabel}>Status</span>
        <span className={styles.statusBadge} data-testid="card-status">
          {card.status}
        </span>
      </div>

      {card.freezeReason ? (
        <p className={styles.reason}>Reason: {card.freezeReason}</p>
      ) : null}

      {/* TODO: Disable this button while unfreeze POST is in-flight */}
      {/* TODO: If freezeReason === "compliance", hide this button entirely
          and show: "This card is locked by our compliance team. Please contact support." */}
      {/* TODO: Show daily limit as a progress bar: usedToday / dailyLimit
          Format both values with formatCurrency util */}
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          void onUnfreeze();
        }}
      >
        Unfreeze Card
      </button>
    </section>
  );
}
