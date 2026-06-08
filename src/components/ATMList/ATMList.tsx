import { ATMListResponse } from "../../types/card";
import { useFetch } from "../../hooks/useFetch";
import { ATMItem } from "./ATMItem";
import styles from "./ATMList.module.css";

export function ATMList() {
  const atmState = useFetch<ATMListResponse>("/api/atm/nearby?lat=51.51&lng=-0.09");

  if (atmState.status !== "success") {
    return (
      <section className={styles.panel} aria-labelledby="atm-list-heading">
        <h2 id="atm-list-heading" className={styles.title}>
          Nearby ATMs
        </h2>
      </section>
    );
  }

  return (
    <section className={styles.panel} aria-labelledby="atm-list-heading">
      <h2 id="atm-list-heading" className={styles.title}>
        Nearby ATMs
      </h2>
      <ul className={styles.list}>
        {atmState.data.atms.map((atm) => (
          <ATMItem key={atm.id} atm={atm} />
        ))}
      </ul>
    </section>
  );
}
