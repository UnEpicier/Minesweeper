// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Hooks & Utils ----------------------------------------------------
import { useLangStore } from '@/store/langState';
import { useActions } from './hooks/useActions';
import { getCellDisplayContent } from '../../utils/gameInteractions';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import Podium from '../../assets/podium';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Grid = () => {
	const config = useLangStore((state) => state.config);
	const { grid, gridSize, endType, handleLeftClick, handleRightClick, openLeaderboard } = useActions();

	return (
		<div
			className='grid'
			style={{
				gridTemplateRows: `repeat(${gridSize}, var(--size))`,
			}}
		>
			{grid.map((row, rowIndex) => (
				<div
					key={`row${rowIndex}`}
					className='row'
					style={{
						gridTemplateColumns: `repeat(${gridSize}, var(--size))`,
					}}
				>
					{row.map((cell, cellIndex) => {
						return (
							<button
								key={`cell${cellIndex}`}
								className={`cell ${cell.hidden ? 'hidden' : cell.value !== 'empty' ? `v${cell.value}` : ''}`}
								onClick={(ev) => handleLeftClick(ev, rowIndex, cellIndex)}
								onContextMenu={(ev) => handleRightClick(ev, rowIndex, cellIndex)}
							>
								{getCellDisplayContent(cell)}
							</button>
						);
					})}
				</div>
			))}
			{endType !== '' && (
				<div
					className='overlay'
					style={
						{
							'--overlayColor': endType === 'win' ? '#5f8e59' : '#ca5940',
						} as React.CSSProperties
					}
				>
					<p className='overlayTitle'>{endType === 'win' ? config.win : config.loose}</p>
					<button
						className='overlayButton'
						onClick={openLeaderboard}
					>
						<Podium />
						Leaderboard
					</button>
				</div>
			)}
		</div>
	);
};

export default Grid;
