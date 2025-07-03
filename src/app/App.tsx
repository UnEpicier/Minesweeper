// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Components ------------------------------------------------------
import Home from '../components/Home/Home';
import Timer from '../components/Stats/Timer/Timer';
import MinesCounter from '../components/Stats/MinesCounter/MinesCounter';
import Grid from '../components/Grid/Grid';
import Help from '../components/Help/Help';
import LeaderBoard from '../components/Leaderboard/Leaderboard';
import LangToggler from '../components/LangToggler/LangToggler';
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import { useLangStore } from '../store/langState';
import { useGameStateStore } from '@/store/gameState';
import frConf from '../langs/fr.json';
import enConf from '../langs/en.json';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import Logo from '../assets/logo';
import './App.scss';
// ---------------------------------------------------------------------------------------------------------------------

const App = () => {
	const [helpDisplayed, displayHelp] = useState(false);

	const gameStatus = useGameStateStore((state) => state.status);
	const { key, config, setLang } = useLangStore();

	useEffect(() => {
		const storedLang = localStorage.getItem('lang');

		if (storedLang === null) {
			localStorage.setItem('lang', 'fr');
			setLang({
				key: 'fr',
				config: frConf,
			});
			return;
		}

		if (storedLang === 'fr') {
			setLang({
				key: 'fr',
				config: frConf,
			});
			return;
		}

		setLang({
			key: 'en',
			config: enConf,
		});
	}, [key]);

	if (!config) {
		return;
	}

	return (
		<div className='App'>
			<LangToggler />
			{gameStatus === 'settings' && <Home />}
			{(gameStatus === 'idle' || gameStatus === 'playing') && (
				<>
					<div className='stats'>
						<Timer />
						<Logo className={'logo'} />
						<MinesCounter />
					</div>
					<Grid />
					<button
						className='help-button'
						onClick={() => displayHelp(true)}
					>
						<span>{config.how}</span>
					</button>
					{helpDisplayed && (
						<Help
							onClose={() => {
								displayHelp(false);
							}}
						/>
					)}
				</>
			)}
			{gameStatus === 'board' && <LeaderBoard />}
		</div>
	);
};

export default App;
