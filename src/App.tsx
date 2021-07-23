import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import MyProfile from './pages/Profile/MyProfile'

const App: React.FC<{}> = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/myprofile" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/myprofile" component={MyProfile} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
