// ---------------------------------------------------------------------------------------------------------------------
//!                                                      Imports
// ---------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------- Components ------------------------------------------------------
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
// ---------------------------------------------------------------------------------------------------------------------

import './index.scss';

const appElement = document.getElementById('root');
if (!appElement) throw Error('No app root element found');

const reactRoot = createRoot(appElement);

reactRoot.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
