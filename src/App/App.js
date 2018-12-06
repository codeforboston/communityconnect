import React, { Component } from 'react';
import {Route} from 'react-router';

import Homepage from './Homepage'

const App = () => (
  <div>
    <Route path = '/' component={Homepage} />
  </div>
)

export default App;