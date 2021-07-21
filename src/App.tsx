import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import Navbar from './components/navbar'

const App: React.FC<{}> = () => {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
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
