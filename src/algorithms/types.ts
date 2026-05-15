export interface SortStep {
  /** Full array snapshot at this step */
  array: number[];
  /** Indexes currently being compared */
  comparing: number[];
  /** Indexes currently being swapped or moved */
  swapping: number[];
  /** Indexes confirmed as sorted */
  sorted: number[];
  /** Indexes being overwritten (merge/insert moves) */
  overwriting: number[];
  /** 1-based line number in the displayed code snippet */
  codeLine: number;
  /** Short human-readable description */
  description: string;
}

export interface AlgorithmInfo {
  id: string;
  name: string;
  explanation: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
  codeLines: string[];
  generateSteps: (arr: number[]) => SortStep[];
}
