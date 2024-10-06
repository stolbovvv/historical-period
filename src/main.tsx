import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/pt-sans/700.css';
import '@fontsource/pt-sans/400.css';
import '@fontsource/bebas-neue';
import 'swiper/css';
import 'swiper/css/navigation';
import './main.scss';
import App from './App';

const root = document.getElementById('root');

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
