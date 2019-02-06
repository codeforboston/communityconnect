import React from 'react';
import {Route} from 'react-router';

import AppContainer from './AppContainer'

const App = () => (
  <div>
    <Route path = '/' component={AppContainer} />
  </div>
)

export default App;
