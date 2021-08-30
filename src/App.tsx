import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import {
  Login,
  Register,
  Home,
  ForgotPassword,
  LinkAccount,
  NotFound,
  Profile,
  LectureDetail,
  VerifyEmail,
} from './pages'
import Yoyo from './pages/Yoyo'
import { LayoutRoute } from './components'
import eiei from './pages/Yoyo/user'
import Post from './pages/Yoyo/Post'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/* ชั่วคราวสำหรับ test */}
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <LayoutRoute exact path="/home" component={Home} />
          <LayoutRoute exact path="/lecturedetail" component={LectureDetail} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/verifyEmail" component={VerifyEmail} />
          <LayoutRoute exact path="/profile" component={Profile} />
          {/* for test */}
          <LayoutRoute exact path="/yoyo" component={Yoyo} />
          <LayoutRoute exact path="/post/:id" component={Post} />
          <LayoutRoute exact path="/pong" component={eiei} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
