import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import MyProfile from './pages/Profile/MyProfile'
import { AccountManage } from './components/AccountManage'
import { PrivatRoute } from './components/PrivateRouth'

const App: React.FC<{}> = () => {
  return (
    <>
      <HashRouter>
        <AccountManage />
        <Switch>
          <Route exact path="/">
            <Redirect to="/myprofile" />
          </Route>
          <PrivatRoute exact path="/login" component={Login} />
          <PrivatRoute exact path="/register" component={Register} />
          <PrivatRoute exact path="/success" component={Success} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App
