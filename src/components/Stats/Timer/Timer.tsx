// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../../contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Utils & Types ----------------------------------------------------
import { Difficulty } from '../../../types/game';
import { saveToLocalStorage } from '../../../utils/generics';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Clock from '../../../assets/clock';
import '../styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Timer = () => {
	const [gameState, setGameState] = useRecoilState(gameStateAtom);

	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const [startedTime, setStartedTime] = useState<number | null>(null);
	const [displayedTime, setDisplayedTime] = useState<string>('00:00');

	useEffect(() => {
		if (gameState.status === 'win' || gameState.status === 'loose') {
			setStartedTime(null);
		}
	}, [gameState.status]);

	useEffect(() => {
		if (!startedTime && gameState.endType === '' && gameState.status === 'playing') {
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
	}, [startedTime, gameState.endType, gameState.status]);

	useEffect(() => {
		if (intervalId && gameState.endType !== '') {
			setGameState((prev) => ({
				...prev,
				gameTime: displayedTime,
			}));

			clearInterval(intervalId);

			if (gameState.endType === 'win') {
				saveToLocalStorage(displayedTime, gameState.difficulty as Difficulty, gameState.gridSize);
			}
		}
	}, [intervalId, gameState.endType, gameState.difficulty, gameState.gridSize, setGameState, displayedTime]);

	return (
		<div className='statContainer'>
			<Clock />
			<p>{displayedTime}</p>
		</div>
	);
};

export default Timer;
