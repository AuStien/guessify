import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Callback from './Callback'
import Home from './Home'

function App(props) {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/callback">
          <Callback></Callback>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
