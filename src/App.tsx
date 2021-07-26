import React from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import homeIcon from './assets/icons/.gitkeep/home_icon.svg'

const App: React.FC<{}> = () => {
  return (
    <div>
      <HashRouter>
        {/* <img src={homeIcon} alt="this is home icon" className='-m-2' /> */}
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
