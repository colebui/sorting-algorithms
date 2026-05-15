import { useState, useEffect, useRef, useCallback } from 'react';
import { algorithms } from './data/algorithmMetadata';
import { generateRandomArray } from './utils/arrayUtils';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { CodePanel } from './components/CodePanel';
import { Controls } from './components/Controls';
import { ExplanationPanel } from './components/ExplanationPanel';
import { ComplexityCard } from './components/ComplexityCard';
import type { SortStep } from './algorithms/types';
import styles from './App.module.css';

const DEFAULT_SIZE = 14;
const DEFAULT_SPEED = 500; // ms

function App() {
  const [selectedAlgId, setSelectedAlgId] = useState(algorithms[0].id);
  const [arraySize, setArraySize]         = useState(DEFAULT_SIZE);
  const [baseArray, setBaseArray]         = useState<number[]>(() => generateRandomArray(DEFAULT_SIZE));
  const [steps, setSteps]                 = useState<SortStep[]>([]);
  const [stepIdx, setStepIdx]             = useState(0);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [speed, setSpeed]                 = useState(DEFAULT_SPEED);

  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedAlg = algorithms.find((a) => a.id === selectedAlgId)!;

  /** Recompute steps whenever the algorithm or base array changes */
  useEffect(() => {
    const newSteps = selectedAlg.generateSteps(baseArray);
    setSteps(newSteps);
    setStepIdx(0);
    setIsPlaying(false);
  }, [selectedAlgId, baseArray]);

  /** Auto-play ticker */
  useEffect(() => {
    if (playRef.current) clearInterval(playRef.current);
    if (!isPlaying) return;

    playRef.current = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [isPlaying, speed, steps.length]);

  const handleAlgChange = useCallback((id: string) => {
    setIsPlaying(false);
    setSelectedAlgId(id);
  }, []);

  const handleRandomize = useCallback(() => {
    setIsPlaying(false);
    setBaseArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleSizeChange = useCallback((size: number) => {
    setArraySize(size);
    setIsPlaying(false);
    setBaseArray(generateRandomArray(size));
  }, []);

  const handleCustomArray = useCallback((arr: number[]) => {
    setIsPlaying(false);
    setArraySize(arr.length);
    setBaseArray(arr);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setStepIdx(0);
  }, []);

  const currentStep = steps[stepIdx] ?? {
    array: baseArray,
    comparing: [],
    swapping: [],
    sorted: [],
    overwriting: [],
    codeLine: 1,
    description: 'Press Play or Step Forward to begin.',
  };

  const maxValue = Math.max(...(steps[0]?.array ?? baseArray), 1);

  return (
    <div className={styles.app}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>SortViz</span>
        </div>
        <span className={styles.headerBadge}>Interactive Algorithm Visualizer</span>
      </header>

      {/* ── Main ── */}
      <main className={styles.main}>
        {/* Algorithm picker + complexity */}
        <div className={styles.topRow}>
          <div className={styles.topLeft}>
            <span className={styles.sectionLabel}>Choose Algorithm</span>
            <AlgorithmSelector
              algorithms={algorithms}
              selectedId={selectedAlgId}
              onSelect={handleAlgChange}
            />
          </div>
          <ComplexityCard
            bestCase={selectedAlg.bestCase}
            averageCase={selectedAlg.averageCase}
            worstCase={selectedAlg.worstCase}
            spaceComplexity={selectedAlg.spaceComplexity}
          />
        </div>

        {/* Visualizer + Code panel */}
        <div className={styles.middleRow}>
          <ArrayVisualizer step={currentStep} maxValue={maxValue} />
          <CodePanel
            codeLines={selectedAlg.codeLines}
            activeLine={currentStep.codeLine}
            algorithmName={selectedAlg.name}
          />
        </div>

        {/* Controls + Explanation */}
        <div className={styles.bottomRow}>
          <Controls
            currentStep={stepIdx}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            speed={speed}
            arraySize={arraySize}
            onStepForward={() => setStepIdx((p) => Math.min(p + 1, steps.length - 1))}
            onStepBackward={() => setStepIdx((p) => Math.max(p - 1, 0))}
            onPlay={() => {
              if (stepIdx >= steps.length - 1) setStepIdx(0);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            onRandomize={handleRandomize}
            onSizeChange={handleSizeChange}
            onCustomArray={handleCustomArray}
          />
          <ExplanationPanel
            step={currentStep}
            currentStepIndex={stepIdx}
            totalSteps={steps.length}
            algorithmName={selectedAlg.name}
            algorithmExplanation={selectedAlg.explanation}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        Built with React + TypeScript + Vite &nbsp;·&nbsp; SortViz
      </footer>
    </div>
  );
}

export default App;
