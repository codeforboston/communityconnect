import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { loadResources, loadCategories } from './action/resourceDataAction';

const store = configureStore();
// Dispatch actions to load initial state.
store.dispatch(loadResources());
store.dispatch(loadCategories());
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
