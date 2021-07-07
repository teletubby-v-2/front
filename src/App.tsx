import React from 'react';
import './style/App.css';
import 'antd/dist/antd.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';

import Login from 'views/Login';
import Register from 'views/Register';
import Success from 'views/Success';

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
