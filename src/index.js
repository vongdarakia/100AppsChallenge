import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

import './index.css';
import PortfolioApp from './App';
import registerServiceWorker from './registerServiceWorker';

// let store = createStore(
// 	portfolioApp,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

let store = configureStore();

render(
	<Provider store={store}>
		<BrowserRouter>
			<PortfolioApp />
		</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
