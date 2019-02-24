import React from 'react';
import {Route} from 'react-router';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import AppContainer from './AppContainer'

library.add(fab, fas);
const App = () => (
  <div>
    <Route path = '/' component={AppContainer} />
  </div>
)

export default App;
