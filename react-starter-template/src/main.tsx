import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={qc}>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" client={qc} />
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
