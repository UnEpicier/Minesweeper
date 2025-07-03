import { create } from 'zustand';

type LangStore = {
	key: any;
	config: any;

	setKey: (key: any) => void;
	setLang: ({ key, config }: { key: any; config: any }) => void;
};

export const useLangStore = create<LangStore>((set) => ({
	key: null,
	config: null,
	setKey: (key) => set({ key: key }),
	setLang: ({ key, config }) => set({ key: key, config: config }),
}));
