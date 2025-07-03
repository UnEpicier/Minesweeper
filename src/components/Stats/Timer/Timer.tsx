// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStateStore } from '@/store/gameState';
import { saveToLocalStorage } from '../../../utils/generics';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import Clock from '../../../assets/clock';
import '../styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Timer = () => {
	const { status, endType, difficulty, gridSize, setGameTime } = useGameStateStore(
		useShallow((state) => ({
			status: state.status,
			endType: state.endType,
			difficulty: state.difficulty,
			gridSize: state.gridSize,

			setGameTime: state.setGameTime,
		})),
	);

	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const [startedTime, setStartedTime] = useState<number | null>(null);
	const [displayedTime, setDisplayedTime] = useState<string>('00:00');

	useEffect(() => {
		if (endType === 'win' || endType === 'loose') {
			setStartedTime(null);
		}
	}, [status]);

	useEffect(() => {
		if (!startedTime && endType === '' && status === 'playing') {
			const now = Date.now();
			setStartedTime(now);

			const interval = setInterval(() => {
				const elapsedTime = (Date.now() - now) / 1000;

				const seconds = Math.floor(elapsedTime % 60);
				const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

				const minutes = Math.floor(elapsedTime / 60);
				const strMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

				setDisplayedTime(`${strMinute}:${strSeconds}`);
			}, 500);

			setIntervalId(interval);
		}
	}, [startedTime, endType, status]);

	useEffect(() => {
		if (intervalId && endType !== '') {
			setGameTime(displayedTime);

			clearInterval(intervalId);

			if (endType === 'win') {
				saveToLocalStorage(displayedTime, difficulty, gridSize);
			}
		}
	}, [intervalId, endType, difficulty, gridSize, displayedTime, setGameTime]);

	return (
		<div className='stat-container'>
			<Clock />
			<p>{displayedTime}</p>
		</div>
	);
};

export default Timer;
