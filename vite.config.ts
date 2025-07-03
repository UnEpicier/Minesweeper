import path from 'path';
import dotenv from 'dotenv';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

const alias = {
	'@app': path.resolve(__dirname, 'src/app'),
	'@assets': path.resolve(__dirname, 'src/assets'),
	'@config': path.resolve(__dirname, 'src/config'),
	'@components': path.resolve(__dirname, 'src/components'),
	'@hooks': path.resolve(__dirname, 'src/hooks'),
	'@pages': path.resolve(__dirname, 'src/pages'),
	'@providers': path.resolve(__dirname, 'src/providers'),
	'@selectors': path.resolve(__dirname, 'src/store/selectors'),
	'@reducers': path.resolve(__dirname, 'src/store/reducers'),
	'@services': path.resolve(__dirname, 'src/store/services'),
	'@store': path.resolve(__dirname, 'src/store'),
	'@utils': path.resolve(__dirname, 'src/utils'),
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslint(),
		VitePWA({
			srcDir: 'src',
			filename: 'sw.js',
			strategies: 'injectManifest',
			manifest: false,
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
	},
	preview: {
		port: 8000,
	},
	server: {
		port: 8080,
	},
});
