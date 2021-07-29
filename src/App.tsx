import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Login, Register, Success, ForgotPassword, LinkAccount, NotFound, Profile } from './pages'
import { LayoutRoute, AccountManage, PrivateRoute } from './components'

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <AccountManage />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <LayoutRoute exact path="/login" component={Login} />
          <LayoutRoute exact path="/register" component={Register} />
          <LayoutRoute exact path="/success" component={Success} />
          <LayoutRoute exact path="/linkAccount" component={LinkAccount} />
          <LayoutRoute exact path="/forgotpassword" component={ForgotPassword} />
          <LayoutRoute exact path="/profile" component={Profile} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App
