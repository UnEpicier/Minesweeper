import js from '@eslint/js';
import { Linter } from 'eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

const config: Linter.Config[] = [
	js.configs.recommended,
	react.configs.flat.recommended,
	{
		plugins: {
			react: react,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		rules: {
			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		},

		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];

export default config;
