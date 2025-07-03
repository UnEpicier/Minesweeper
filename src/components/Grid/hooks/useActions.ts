// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import { MouseEvent, useCallback, useState } from 'react';
import { GridType } from '../../../types/game';
import { discoverAroundCell, revealAllGrid } from '../../../utils/gameInteractions';
import { genGrid, startGame } from '../../../utils/generation';
import { useGameStateStore } from '@/store/gameState';
import { useShallow } from 'zustand/react/shallow';
// ---------------------------------------------------------------------------------------------------------------------

export const useActions = () => {
	const { gridSize, endType, status, difficulty, bombs, placedFlags, setStatus, setBombs, setEndType, setPlacedFlags } = useGameStateStore(
		useShallow((state) => ({
			gridSize: state.gridSize,
			endType: state.endType,
			status: state.status,
			difficulty: state.difficulty,
			bombs: state.bombs,
			placedFlags: state.placedFlags,

			setStatus: state.setStatus,
			setBombs: state.setBombs,
			setEndType: state.setEndType,
			setPlacedFlags: state.setPlacedFlags,
		})),
	);
	const [grid, setGrid] = useState(genGrid(gridSize));

	const [, updateGrid] = useState({});
	const forceUpdate = useCallback(() => updateGrid({}), []);

	const handleLeftClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		// Only have action if the cell is hidden and has not a flag on it
		if (grid[rowIndex][colIndex].hidden && !grid[rowIndex][colIndex].flag) {
			setGrid((prev) => {
				let bombsCount: number | null = null;

				// Start the game with making sure the clicked cell will be empty after generation
				if (status === 'idle') {
					const { grid: newGrid, bombsCount: _bombsCount } = startGame(gridSize, difficulty, true, rowIndex, colIndex);
					prev = newGrid;

					bombsCount = _bombsCount;

					setStatus('playing');
					setBombs(_bombsCount);
				}

				// If the clicked cell hide a bomb, loose immediatly
				if (prev[rowIndex][colIndex].value === 'bomb') {
					setEndType('loose');
					return revealAllGrid(grid, true);
				}
				// Discover surronding cells if the clicked is empty
				else if (prev[rowIndex][colIndex].value === 'empty') {
					prev = discoverAroundCell(prev, rowIndex, colIndex);
				} else {
					prev[rowIndex][colIndex].hidden = false;
				}

				if (hasWin(prev, bombsCount || bombs, placedFlags)) {
					setEndType('win');
					return revealAllGrid(prev, true);
				}

				return prev;
			});

			// Since React state cannot see if a large nested object has changed, we need to call a forceUpdate method
			forceUpdate();
		}
	};

	const handleRightClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		// Only have action if the cell is hidden
		if (grid[rowIndex][colIndex].hidden) {
			setGrid((prev) => {
				let bombsCount: number | null = null;

				// Start the game without making sure the clicked cell will be empty after generation
				if (status === 'idle') {
					const { grid: newGrid, bombsCount: _bombsCount } = startGame(gridSize, difficulty, false);
					prev = newGrid;

					bombsCount = _bombsCount;

					setStatus('playing');
					setBombs(_bombsCount);
				}

				prev = prev.map((row, idx) => {
					if (idx === rowIndex) {
						return row.map((col, idy) => {
							if (idy === colIndex) {
								setPlacedFlags(col.flag ? placedFlags - 1 : placedFlags + 1);

								return {
									...col,
									flag: !col.flag,
								};
							}
							return col;
						});
					}
					return row;
				});

				if (hasWin(prev, bombsCount || bombs, placedFlags)) {
					setEndType('win');
					return revealAllGrid(grid, true);
				}

				return prev;
			});
		}
	};

	const openLeaderboard = useCallback(() => {
		setStatus('board');
	}, [setStatus]);

	return {
		grid,
		gridSize,
		endType,
		handleLeftClick,
		handleRightClick,
		openLeaderboard,
	};
};

const hasWin = (grid: GridType, bombs: number, placedFlags: number) => {
	let bombsFlagged = 0;

	grid.map((row) => {
		row.map((cell) => {
			if (cell.value === 'bomb' && cell.flag === true) {
				bombsFlagged++;
			}
		});
	});

	if (bombsFlagged === bombs && placedFlags === bombs) {
		return true;
	}

	return false;
};
