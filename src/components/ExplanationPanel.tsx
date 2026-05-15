import type { SortStep } from '../algorithms/types';
import styles from './ExplanationPanel.module.css';

interface Props {
  step: SortStep;
  currentStepIndex: number;
  totalSteps: number;
  algorithmName: string;
  algorithmExplanation: string;
}

export function ExplanationPanel({
  step,
  currentStepIndex,
  totalSteps,
  algorithmName,
  algorithmExplanation,
}: Props) {
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 100;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>💡</span>
        <span className={styles.title}>What's Happening</span>
      </div>

      <p className={styles.operation}>{step.description}</p>

      <div className={styles.progress}>
        <div className={styles.progressLabel}>
          <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.algSummary}>
        <div className={styles.algSummaryTitle}>About {algorithmName}</div>
        {algorithmExplanation}
      </div>
    </div>
  );
}
