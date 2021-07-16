import React, { useState } from 'react'
import logo from './logo.svg'
import { firebaseApp } from './config/firebase'
import { Button } from 'antd'
import { userInfoStore } from './store/user.store'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import { ForgotPassword } from './pages/ForgotPassword'

function App() {
  const { displayName, setDisplayName } = userInfoStore()
  const token = localStorage.getItem('idToken')

  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/success" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
