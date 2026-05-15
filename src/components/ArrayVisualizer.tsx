import type { SortStep } from '../algorithms/types';
import styles from './ArrayVisualizer.module.css';

interface Props {
  step: SortStep;
  maxValue: number;
}

const LEGEND = [
  { label: 'Comparing', key: 'comparing', color: 'var(--compare)' },
  { label: 'Swapping',  key: 'swapping',  color: 'var(--swap)' },
  { label: 'Sorted',    key: 'sorted',    color: 'var(--sorted)' },
  { label: 'Overwrite', key: 'overwriting', color: 'var(--overwrite)' },
] as const;

function getBarClass(
  idx: number,
  step: SortStep
): string {
  if (step.swapping.includes(idx))   return styles.swapping;
  if (step.comparing.includes(idx))  return styles.comparing;
  if (step.overwriting.includes(idx)) return styles.overwriting;
  if (step.sorted.includes(idx))     return styles.sorted;
  return '';
}

export function ArrayVisualizer({ step, maxValue }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.bars} role="img" aria-label="Array visualization">
        {step.array.map((val, idx) => {
          const heightPct = Math.max(4, (val / maxValue) * 100);
          const cls = getBarClass(idx, step);
          return (
            <div
              key={idx}
              className={`${styles.bar} ${cls}`}
              style={{ height: `${heightPct}%` }}
              title={`Index ${idx}: ${val}`}
            />
          );
        })}
      </div>

      {/* Value labels — only show when array is small enough */}
      {step.array.length <= 20 && (
        <div className={styles.labels} aria-hidden="true">
          {step.array.map((val, idx) => {
            const cls = getBarClass(idx, step).replace(styles.bar, '').trim();
            return (
              <span key={idx} className={`${styles.label} ${cls}`}>
                {val}
              </span>
            );
          })}
        </div>
      )}

      <div className={styles.legend} aria-hidden="true">
        {LEGEND.map(({ label, color }) => (
          <div key={label} className={styles.legendItem}>
            <div className={styles.dot} style={{ background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
