import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import Navbar from './components/navbar'
import { PrivatRoute } from './components/PrivateRouth'

const App: React.FC<{}> = () => {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PrivatRoute exact path="/login" component={Login} />
          <PrivatRoute exact path="/register" component={Register} />
          <PrivatRoute exact path="/success" component={Success} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App
