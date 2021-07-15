import React, { useState } from 'react'
import logo from './logo.svg'
import { firebaseApp } from './config/firebase'
import { Button } from 'antd'
import { userInfoStore } from './store/user'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'

function App() {
  const { displayName, setDisplayName } = userInfoStore()

  const [yo, setYo] = useState<string>('yo')
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
  )
}

export default App
