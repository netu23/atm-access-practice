import { ATM } from "../../types/card";
import styles from "./ATMList.module.css";

interface ATMItemProps {
  atm: ATM;
}

export function ATMItem({ atm }: ATMItemProps) {
  return (
    <li className={styles.item}>
      <div>
        <h3 className={styles.bank}>{atm.bank}</h3>
        <p className={styles.address}>{atm.address}</p>
      </div>
      {/* TODO: Show distance in human-readable format e.g. "320 m" or "1.2 km"
          Use the formatDistance util (you need to implement it) */}
      {/* TODO: Unavailable ATMs should be visually dimmed and show "Currently unavailable" */}
      {/* TODO: Show maxDispense formatted as currency e.g. "Max: £300" */}
    </li>
  );
}
