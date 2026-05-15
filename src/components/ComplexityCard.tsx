import styles from './ComplexityCard.module.css';

interface Props {
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
}

export function ComplexityCard({ bestCase, averageCase, worstCase, spaceComplexity }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Complexity</div>
      <div className={styles.grid}>
        <div className={`${styles.item} ${styles.highlight}`}>
          <div className={styles.itemLabel}>Best Case</div>
          <div className={styles.itemValue}>{bestCase}</div>
        </div>
        <div className={`${styles.item} ${styles.warn}`}>
          <div className={styles.itemLabel}>Average Case</div>
          <div className={styles.itemValue}>{averageCase}</div>
        </div>
        <div className={`${styles.item} ${styles.danger}`}>
          <div className={styles.itemLabel}>Worst Case</div>
          <div className={styles.itemValue}>{worstCase}</div>
        </div>
        <div className={`${styles.item} ${styles.space}`}>
          <div className={styles.itemLabel}>Space</div>
          <div className={styles.itemValue}>{spaceComplexity}</div>
        </div>
      </div>
    </div>
  );
}
