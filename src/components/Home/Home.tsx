// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import { useCallback, useRef } from 'react';
import localforage from 'localforage';
import { useShallow } from 'zustand/react/shallow';
import { useGameStateStore } from '../../store/gameState';
import { useLangStore } from '../../store/langState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import Size from '../../assets/size';
import Difficulty from '../../assets/difficulty';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const store = localforage.createInstance({
	name: 'leaderboard',
	driver: localforage.INDEXEDDB,
	version: 1.0,
	storeName: 'leaderboard',
	description: 'Store 10 best game time',
});

export default function Home() {
	const difficultyRef = useRef<HTMLSelectElement>(null);
	const sizeRef = useRef<HTMLSelectElement>(null);

	const { setDifficulty, setGridSize, setStatus } = useGameStateStore(
		useShallow((state) => ({
			setDifficulty: state.setDifficulty,
			setGridSize: state.setGridSize,
			setStatus: state.setStatus,
		})),
	);

	const config = useLangStore((state) => state.config);

	const onClick = useCallback(() => {
		if (difficultyRef.current !== null && sizeRef.current !== null) {
			const difficulty = difficultyRef.current.value;
			const size = sizeRef.current.value;

			(async () => {
				if ((await store.getItem(`${difficulty}:${size}`)) === null) {
					await store.setItem(`${difficulty}:${size}`, []);
				}
			})();

			setGridSize(parseInt(size) as 12 | 16 | 20);
			setDifficulty(difficulty as 'beginner' | 'intermediate' | 'expert');
			setStatus('idle');
		}
	}, []);

	return (
		<div className='gameContainer'>
			<h1 className='title'>{config.appTitle}</h1>

			<div className='settingsContainer'>
				<div className='selectorBox'>
					<p className='settingLabel'>
						<Size />
						{config.settings.size.label}
					</p>
					<select
						ref={sizeRef}
						name='gridSize'
						className='select'
						defaultValue={'12'}
					>
						<option value='12'>{config.settings.size.values.small}</option>
						<option value='16'>{config.settings.size.values.medium}</option>
						<option value='20'>{config.settings.size.values.large}</option>
					</select>
				</div>

				<div className='selectorBox'>
					<p className='settingLabel'>
						<Difficulty />
						{config.settings.difficulty.label}
					</p>
					<select
						ref={difficultyRef}
						name='difficulty'
						className='select'
						defaultValue={'beginner'}
					>
						<option value='beginner'>{config.settings.difficulty.values.beginner}</option>
						<option value='intermediate'>{config.settings.difficulty.values.intermediate}</option>
						<option value='expert'>{config.settings.difficulty.values.expert}</option>
					</select>
				</div>

				<button
					className='startButton'
					onClick={onClick}
				>
					{config.start}
				</button>
			</div>
		</div>
	);
}
