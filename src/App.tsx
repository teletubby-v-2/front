import React from 'react';
import './style/App.css';
import 'antd/dist/antd.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from 'pages/Login';
import Register from 'pages/Register';
import Success from 'pages/Success';

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
