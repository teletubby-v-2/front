import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import { AccountManage } from './components/AccountManage'
import { PrivateRoute } from './components/PrivateRouth'
import { Profile } from './pages/Profile'
import HomeIcon from './assets/icons/home_icon.svg'

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <AccountManage />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/success" component={Success} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App
