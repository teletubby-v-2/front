import React from 'react'
import LoginTest from './pages/LoginTest'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'

const App: React.FC<{}> = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={LoginTest} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/linkAccount" component={LinkAccount} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
