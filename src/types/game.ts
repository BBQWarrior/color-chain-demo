import { Color } from './color';

export type GameStatus = 'idle' | 'playing' | 'scored';

export interface RoundResult {
    colorA: Color;
    colorB: Color;
    targetColor: Color;
    guessColor: Color;
    score: number;
    timestamp: Date;
}

export interface GameState {
    status: GameStatus;
    colorA: Color;
    colorB: Color;
    targetColor: Color;
    guessColor: Color | null;
    currentScore: number;
    bestScore: number;
    totalScore: number;
    history: RoundResult[];
}
