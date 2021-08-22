import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
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
import { LayoutRoute, AccountManage } from './components'
import Yoyo from './pages/Yoyo'
import YoyoComment from './pages/Yoyo/YoyoComment'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
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
          {/* for test */}
          <LayoutRoute exact path="/yoyo" component={Yoyo} />
          <LayoutRoute exact path="/yoyoComment" component={YoyoComment} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
