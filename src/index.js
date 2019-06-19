import React from 'react';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import {Route, Switch, Redirect} from 'react-router';
import AppContainer from './App/AppContainer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import './print.css';


library.add(fab, fas);

export const getRoutes = (store) => {        
    return (
        <div>
            <Switch>
                <Redirect from="/admin" to="/revere/admin"/>
                <Route path = '/:resource/admin' exact component={AppContainer} dispatch={store.dispatch}/>

                <Route path = '/:resource/' exact component={AppContainer} dispatch={store.dispatch}/>
                <Redirect from="/" to="/revere"/>

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            { getRoutes(store) }
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
