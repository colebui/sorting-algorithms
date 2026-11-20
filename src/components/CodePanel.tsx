import { useEffect, useRef } from 'react';
import styles from './CodePanel.module.css';

interface Props {
  codeLines: string[];
  activeLine: number; // 1-based
  algorithmName: string;
}

/**
 * Very lightweight token coloriser — enough for readability without a full
 * syntax-highlight library.
 */
function tokenise(line: string): React.ReactNode {
  // comment
  if (line.trimStart().startsWith('//')) {
    return <span className={styles.cmt}>{line}</span>;
  }

  const parts: React.ReactNode[] = [];

  const KEYWORDS = /\b(function|const|let|return|if|else|while|for|of|in|new|true|false|null|undefined)\b/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  KEYWORDS.lastIndex = 0;
  while ((match = KEYWORDS.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={match.index} className={styles.kw}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return <>{parts}</>;
}

export function CodePanel({ codeLines, activeLine, algorithmName }: Props) {
  const activeRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  // Keep the active line visible by scrolling only the code box itself.
  // (scrollIntoView would also scroll the page, yanking it to the code panel
  // on every step.)
  useEffect(() => {
    const box = codeRef.current;
    const line = activeRef.current;
    if (!box || !line) return;

    const boxRect = box.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    let delta = 0;
    if (lineRect.top < boxRect.top) delta = lineRect.top - boxRect.top;
    else if (lineRect.bottom > boxRect.bottom) delta = lineRect.bottom - boxRect.bottom;

    // Instant, not smooth: smooth scrolls get dropped when steps come quickly
    // or the box is off-screen, leaving the active line hidden.
    if (delta !== 0) box.scrollTop += delta;
  }, [activeLine]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerDots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
        <span className={styles.title}>{algorithmName.toLowerCase().replace(/ /g, '_')}.ts</span>
      </div>

      <div ref={codeRef} className={styles.code} role="region" aria-label="Algorithm source code">
        {codeLines.map((line, i) => {
          const lineNum = i + 1;
          const isActive = lineNum === activeLine;
          return (
            <div
              key={i}
              ref={isActive ? activeRef : undefined}
              className={`${styles.line} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className={styles.lineNum}>{lineNum}</span>
              <span className={styles.lineCode}>{tokenise(line)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
