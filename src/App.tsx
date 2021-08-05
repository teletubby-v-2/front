import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import {
  Login,
  Register,
  Success,
  ForgotPassword,
  LinkAccount,
  NotFound,
  Profile,
  LectureDetail,
} from './pages'
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <LayoutRoute exact path="/success" component={Success} />
          <LayoutRoute exact path="/lecturedetail" component={LectureDetail} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <LayoutRoute exact path="/profile" component={Profile} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </HashRouter>
    </>
  )
}

export default App
