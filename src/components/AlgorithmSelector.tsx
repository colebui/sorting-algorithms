import type { AlgorithmInfo } from '../algorithms/types';
import styles from './AlgorithmSelector.module.css';

interface Props {
  algorithms: AlgorithmInfo[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function AlgorithmSelector({ algorithms, selectedId, onSelect }: Props) {
  return (
    <div className={styles.wrapper} role="group" aria-label="Select algorithm">
      {algorithms.map((alg) => (
        <button
          key={alg.id}
          className={`${styles.btn} ${selectedId === alg.id ? styles.active : ''}`}
          onClick={() => onSelect(alg.id)}
          aria-pressed={selectedId === alg.id}
        >
          {alg.name}
        </button>
      ))}
    </div>
  );
}
