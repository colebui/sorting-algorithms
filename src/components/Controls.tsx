import { useState } from 'react';
import { parseCustomArray } from '../utils/arrayUtils';
import styles from './Controls.module.css';

interface Props {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;          // ms between steps, controlled externally
  arraySize: number;
  onStepForward: () => void;
  onStepBackward: () => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (ms: number) => void;
  onRandomize: () => void;
  onSizeChange: (size: number) => void;
  onCustomArray: (arr: number[]) => void;
}

const SPEED_MIN = 50;
const SPEED_MAX = 1500;
const SIZE_MIN = 4;
const SIZE_MAX = 30;

function speedLabel(ms: number) {
  if (ms <= 100) return 'Very Fast';
  if (ms <= 300) return 'Fast';
  if (ms <= 700) return 'Normal';
  if (ms <= 1200) return 'Slow';
  return 'Very Slow';
}

// SVG icons (inline, tiny)
const PlayIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const NextIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;
const PrevIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>;
const ResetIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>;

export function Controls({
  currentStep, totalSteps, isPlaying, speed, arraySize,
  onStepForward, onStepBackward, onPlay, onPause, onReset,
  onSpeedChange, onRandomize, onSizeChange, onCustomArray,
}: Props) {
  const [customInput, setCustomInput] = useState('');
  const [customError, setCustomError] = useState('');

  const handleCustomApply = () => {
    const arr = parseCustomArray(customInput);
    if (!arr) {
      setCustomError('Enter 2–30 integers separated by commas, e.g. 5, 3, 8, 1');
      return;
    }
    setCustomError('');
    setCustomInput('');
    onCustomArray(arr);
  };

  const handleCustomKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCustomApply();
  };

  // Slider: invert so left = fast, right = slow
  const sliderValue = SPEED_MAX - speed + SPEED_MIN;

  return (
    <div className={styles.panel}>
      {/* ── Playback controls ── */}
      <div className={styles.playback}>
        <button
          className={styles.iconBtn}
          onClick={onReset}
          title="Reset"
          aria-label="Reset"
        >
          <ResetIcon />
        </button>

        <button
          className={styles.iconBtn}
          onClick={onStepBackward}
          disabled={currentStep === 0}
          title="Previous step"
          aria-label="Step backward"
        >
          <PrevIcon />
        </button>

        <button
          className={`${styles.iconBtn} ${styles.primary}`}
          onClick={isPlaying ? onPause : onPlay}
          disabled={currentStep >= totalSteps - 1 && !isPlaying}
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          className={styles.iconBtn}
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1}
          title="Next step"
          aria-label="Step forward"
        >
          <NextIcon />
        </button>

        <span className={styles.stepCounter}>
          Step <strong>{currentStep + 1}</strong> / {totalSteps}
        </span>
      </div>

      {/* ── Speed slider ── */}
      <div className={styles.speedRow}>
        <span className={styles.label}>Speed</span>
        <input
          type="range"
          className={styles.slider}
          min={SPEED_MIN}
          max={SPEED_MAX}
          value={sliderValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            onSpeedChange(SPEED_MAX - v + SPEED_MIN);
          }}
          aria-label="Animation speed"
        />
        <span className={styles.speedLabel}>{speedLabel(speed)}</span>
      </div>

      {/* ── Array controls ── */}
      <div className={styles.arrayControls}>
        <div className={styles.sizeRow}>
          <span className={styles.label}>Size</span>
          <input
            type="range"
            className={styles.slider}
            min={SIZE_MIN}
            max={SIZE_MAX}
            value={arraySize}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            aria-label="Array size"
          />
          <span className={styles.speedLabel}>{arraySize}</span>
        </div>

        <button className={styles.actionBtn} onClick={onRandomize}>
          🔀 Randomize
        </button>
      </div>

      {/* ── Custom array ── */}
      <div>
        <div className={styles.customRow}>
          <input
            className={`${styles.customInput} ${customError ? styles.error : ''}`}
            type="text"
            placeholder="Custom array: 5, 3, 8, 1, 9, 2"
            value={customInput}
            onChange={(e) => { setCustomInput(e.target.value); setCustomError(''); }}
            onKeyDown={handleCustomKey}
            aria-label="Custom array input"
          />
          <button className={styles.actionBtn} onClick={handleCustomApply}>
            Apply
          </button>
        </div>
        {customError && <p className={styles.customError}>{customError}</p>}
      </div>
    </div>
  );
}
