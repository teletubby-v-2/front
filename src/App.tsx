import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Profile } from './pages/Profile'
import { Login, Register, Success, ForgotPassword, LinkAccount } from './pages'
import { MyLayout, AccountManage, PrivateRoute } from './components'

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <MyLayout>
          <AccountManage />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/linkAccount" component={LinkAccount} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </MyLayout>
      </HashRouter>
    </>
  )
}

export default App
