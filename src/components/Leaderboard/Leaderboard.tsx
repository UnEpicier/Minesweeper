// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import useLeaderboard from './hooks/useLeaderboard';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import CalendarIcon from '../../assets/calendar';
import Replay from '../../assets/replay';
import Settings from '../../assets/settings';
import TimerIcon from '../../assets/timer';
import Trash from '../../assets/trash';
import DifficultyIcon from '../../assets/difficulty';
import Size from '../../assets/size';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const LeaderBoard = () => {
	const { config, clearLeaderboard, clearAllLeaderboards, data, difficulty, gridSize, openSettings, replay } = useLeaderboard();

	return (
		<>
			<h1 className='title'>{config.leaderboardTitle}</h1>

			<div className='board'>
				<div className='header'>
					<p>#</p>
					<p>
						<CalendarIcon />
						{config.date}
					</p>
					<p>
						<DifficultyIcon style={{ rotate: '-45deg' }} />
						{config.settings.difficulty.label}
					</p>
					<p>
						<Size />
						{config.settings.size.label}
					</p>
					<p>
						<TimerIcon />
						{config.time}
					</p>
				</div>

				<div className='scoresContainer'>
					{data.map((item, index) => {
						return (
							<div
								className='score'
								key={`score#${index}`}
							>
								<span>{index + 1}</span>
								<span>{item.date}</span>
								<span>{config.settings.difficulty.values[difficulty]}</span>
								<span>{gridSize}</span>
								<span>{item.time}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className='controls'>
				<button
					className='controlButton home'
					onClick={openSettings}
				>
					<Settings />

					{config.settingsBtn}
				</button>

				<button
					className='controlButton replay'
					onClick={replay}
				>
					<Replay />

					{config.replay}
				</button>

				<button
					className='controlButton clear'
					onClick={clearLeaderboard}
				>
					<Trash />
					{config.delete}
				</button>

				<button
					className='controlButton clearAll'
					onClick={clearAllLeaderboards}
				>
					<Replay />
					{config.deleteAll}
				</button>
			</div>
		</>
	);
};

export default LeaderBoard;
