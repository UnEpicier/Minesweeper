import { create } from 'zustand';

type GameStateStore = {
	status: 'settings' | 'idle' | 'playing' | 'board';
	difficulty: 'beginner' | 'intermediate' | 'expert';
	gridSize: 12 | 16 | 20;
	bombs: number;
	placedFlags: number;
	gameTime: string;
	endType: '' | 'win' | 'loose';

	setStatus: (status: 'settings' | 'idle' | 'playing' | 'board') => void;
	setDifficulty: (difficulty: 'beginner' | 'intermediate' | 'expert') => void;
	setGridSize: (gridSize: 12 | 16 | 20) => void;
	setBombs: (amount: number) => void;
	setPlacedFlags: (amount: number) => void;
	setGameTime: (time: string) => void;
	setEndType: (endType: '' | 'win' | 'loose') => void;
};

/**
 * Values:
 * - Status: 'settings' | 'idle' | 'playing' | 'board'
 * - Difficulty: 'beginner' | 'intermediate' | 'expert'
 * - Grid Size: 12, 16, 20
 * - Bombs: ]0;{GridSize}]
 * - Placed Flags: [0;{GridSize}]
 * - gameTime: Timestamp
 * - End Type: 'win' | 'loose'
 */

export const useGameStateStore = create<GameStateStore>((set) => ({
	status: 'settings',
	difficulty: 'beginner',
	gridSize: 12,
	bombs: 0,
	placedFlags: 0,
	gameTime: '',
	endType: '',

	setStatus: (newStatus) => set({ status: newStatus }),
	setDifficulty: (newDifficulty) => set({ difficulty: newDifficulty }),
	setGridSize: (size) => set({ gridSize: size }),
	setBombs: (amount) => set({ bombs: amount }),
	setPlacedFlags: (amount) => set({ placedFlags: amount }),
	setGameTime: (time) => set({ gameTime: time }),
	setEndType: (type) => set({ endType: type }),
}));
