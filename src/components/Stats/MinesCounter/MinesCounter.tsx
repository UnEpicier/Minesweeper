// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utls -----------------------------------------------------
import { useShallow } from 'zustand/react/shallow';
import { useGameStateStore } from '../../../store/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import Flag from '../../../assets/flag';
import '../styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const MinesCounter = () => {
	const { bombs, placedFlags } = useGameStateStore(
		useShallow((state) => ({
			bombs: state.bombs,
			placedFlags: state.placedFlags,
		})),
	);

	return (
		<div className='stat-container'>
			<Flag />
			<p>
				{placedFlags} / {bombs}
			</p>
		</div>
	);
};

export default MinesCounter;
