import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Callback, Header } from './index'

function App() {

  return (
    <React.Fragment>
      <Header/>
      <Router>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/callback">
            <Callback/>
          </Route>
      </Router>
    </React.Fragment>
  );
}

export default App;
