import { useShallow } from 'zustand/react/shallow';
import { useGameStateStore } from '@/store/gameState';
import { useLangStore } from '@/store/langState';
import { LeaderBoardItem } from '@/types/game';
import { useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';

const store = localforage.createInstance({
	name: 'leaderboard',
	driver: localforage.INDEXEDDB,
	version: 1.0,
	storeName: 'leaderboard',
	description: 'Store 10 best game time',
});

export default function useLeaderboard() {
	const { gridSize, difficulty, setBombs, setEndType, setGameTime, setPlacedFlags, setStatus } = useGameStateStore(
		useShallow((state) => ({
			gridSize: state.gridSize,
			difficulty: state.difficulty,

			setStatus: state.setStatus,
			setEndType: state.setEndType,
			setPlacedFlags: state.setPlacedFlags,
			setBombs: state.setBombs,
			setGameTime: state.setGameTime,
		})),
	);
	const config = useLangStore((state) => state.config);

	const [data, setData] = useState<LeaderBoardItem[]>([]);

	const getData = useCallback(async () => {
		const storeData = await store.getItem<LeaderBoardItem[]>(`${difficulty}:${gridSize}`);

		setData(storeData || []);
	}, [difficulty, gridSize]);

	useEffect(() => {
		if (data.length === 0) {
			getData();
		}
	}, [data, getData]);

	const clearAllLeaderboards = useCallback(async () => {
		const keys = await store.keys();

		for (let i = 0; i < keys.length; i++) {
			await store.removeItem(keys[i]);
		}
		getData();
	}, [getData]);

	const clearLeaderboard = useCallback(async () => {
		await store.setItem(`${difficulty}:${gridSize}`, []);
		await getData();
	}, []);

	const openSettings = useCallback(() => {
		setStatus('settings');
		setEndType('');
		setPlacedFlags(0);
		setBombs(0);
		setGameTime('');
	}, [setStatus, setEndType, setPlacedFlags, setBombs, setGameTime]);

	const replay = useCallback(() => {
		setStatus('idle');
		setEndType('');
		setPlacedFlags(0);
		setBombs(0);
		setGameTime('');
	}, [setStatus, setEndType, setPlacedFlags, setBombs, setGameTime]);

	return {
		config,
		clearLeaderboard,
		clearAllLeaderboards,
		data,
		difficulty,
		gridSize,
		openSettings,
		replay,
	};
}
