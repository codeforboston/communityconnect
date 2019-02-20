import React from 'react';
import {Route, Switch} from 'react-router';

import AppContainer from './AppContainer';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

const App = () => (
  <div>
    <Switch>
      <Route path = '/' exact component={AppContainer} />
      <Route path = '/admin' exact component={AppContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
)

export default App;
