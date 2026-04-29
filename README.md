# Color Chain

Color Chain is a React + TypeScript browser game where you try to guess the exact midpoint color between two randomly generated colors.

## Gameplay

1. Press **Start Game**.
2. Two random colors are shown as the endpoints.
3. Use the color picker to choose what you think is the true middle color.
4. Submit your guess to receive a score.
5. Play additional rounds and track your best and total score.

## Scoring

Scoring is based on Euclidean distance in RGB space:

- The target is computed as the per-channel midpoint of the two endpoint colors.
- Distance is computed between your guess and the target.
- Score is normalized to a 0-1000 range where a perfect match is 1000.

Core logic lives in `src/utils/colorUtils.ts` (`calcMiddleColor`, `calculateColorDistance`, `calculateScore`).

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Project structure

- `src/components/GameContainer.tsx`: Top-level game state and round lifecycle.
- `src/components/ColorPicker.tsx`: Interactive color selection UI.
- `src/components/ResultsDisplay.tsx`: Current score, best score, total score, and history.
- `src/utils/colorUtils.ts`: Color conversions and scoring math.
- `src/types/`: Shared TypeScript types.

## Known limitations

- Midpoint and scoring use **RGB space**, not perceptual spaces like LAB/LCH, so “visually middle” may differ from mathematically middle.
- Round history is intentionally capped to prevent unbounded memory growth during very long sessions.
