# ⚡ SortViz — Interactive Sorting Algorithm Visualizer

A polished, step-by-step sorting algorithm visualizer built with **React**, **TypeScript**, and **Vite**. Watch algorithms come to life with synchronized bar animations and live code-line highlighting — designed as both an educational tool and a portfolio showcase.

---

## ✨ Features

- **5 sorting algorithms** — Bubble, Selection, Insertion, Merge, and Quick Sort
- **Step-by-step control** — step forward, backward, play, pause, and reset
- **Synced code highlighting** — the active line in the source code panel updates with every step
- **Color-coded bar visualization** — distinct colors for comparing, swapping, overwriting, and sorted states
- **Auto-play with speed control** — from Very Fast to Very Slow via a slider
- **Array controls** — randomize, resize (4–30 elements), or enter a custom comma-separated array
- **Per-algorithm complexity card** — best, average, worst-case time, and space complexity
- **Explanation panel** — plain-English description of what the algorithm is doing at every step, plus a progress bar
- **Dark, dashboard-style UI** — responsive for desktop and tablet, smooth CSS transitions, JetBrains Mono for code
- **No backend, no database, no auth** — pure frontend React app

---

## 🧮 Algorithms Included

| Algorithm      | Best       | Average    | Worst      | Space    |
|---------------|-----------|-----------|-----------|---------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)    |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)    |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)    |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)    |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n)|

---

## 🛠 Tech Stack

- **React 19** — UI rendering
- **TypeScript** — type safety throughout
- **Vite** — fast dev server and production bundler
- **CSS Modules** — scoped, component-level styles
- **Google Fonts** — Inter + JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone or enter the project directory
cd sorting-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
src/
├── algorithms/
│   ├── types.ts          # SortStep and AlgorithmInfo interfaces
│   ├── bubbleSort.ts     # Step generator for Bubble Sort
│   ├── selectionSort.ts  # Step generator for Selection Sort
│   ├── insertionSort.ts  # Step generator for Insertion Sort
│   ├── mergeSort.ts      # Step generator for Merge Sort
│   └── quickSort.ts      # Step generator for Quick Sort
├── components/
│   ├── AlgorithmSelector.tsx   # Algorithm tab buttons
│   ├── ArrayVisualizer.tsx     # Animated bar chart
│   ├── CodePanel.tsx           # Source code with active-line highlight
│   ├── Controls.tsx            # Playback + array controls
│   ├── ExplanationPanel.tsx    # Step description + progress
│   └── ComplexityCard.tsx      # Time/space complexity display
├── data/
│   └── algorithmMetadata.ts    # Descriptions, complexity, code snippets, generators
├── utils/
│   └── arrayUtils.ts           # Random array generation, custom array parsing
├── App.tsx                     # Root layout + state management
├── App.module.css              # App-level layout styles
└── index.css                   # Global CSS variables and reset
```

---

## 🏗 Architecture Decisions

- **Step generators are pure functions** — each algorithm returns an array of `SortStep` objects computed upfront; the UI only ever renders the current step index.
- **No algorithm logic in components** — components are purely presentational; all sorting logic lives in `src/algorithms/`.
- **CSS Modules** — zero class-name collisions, no runtime style library needed.
- **Easy to extend** — add a new algorithm by creating a step generator, adding its metadata entry, and it automatically appears in the UI.

---

## 🔮 Future Improvements

The following features could be layered on in future iterations:

- **User profiles and authentication** — let learners create accounts to track their progress across sessions
- **Saved custom arrays** — bookmark arrays that are interesting to sort (nearly sorted, reverse sorted, many duplicates)
- **Saved lessons / study mode** — structured curriculum with quizzes and completion tracking
- **Progress tracking and streaks** — gamify learning with a dashboard showing which algorithms have been mastered
- **Database persistence** — store user data, preferences, and notes (PostgreSQL, Supabase, or Firebase)
- **Additional algorithms** — Heap Sort, Shell Sort, Radix Sort, Counting Sort, Tim Sort
- **Comparison mode** — run two algorithms side by side on the same array to compare speed
- **Custom theming** — light mode, high-contrast mode, and user color preferences
- **Mobile-first touch controls** — swipe gestures for step navigation on phones
- **Shareable URLs** — encode the algorithm + array in the URL so learners can share specific examples

---

## 📄 License

MIT
