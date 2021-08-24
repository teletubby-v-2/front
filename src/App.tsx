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
} from './pages'
import Yoyo from './pages/Yoyo'
import YoyoComment from './pages/Yoyo/YoyoComment'
import { LayoutRoute } from './components'
import YoyoReview from './pages/Yoyo/YoyoReview'

import eiei from './pages/Yoyo/user'
import Post from './pages/Yoyo/Post'
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <LayoutRoute exact path="/home" component={Home} />
          <LayoutRoute exact path="/lecturedetail" component={LectureDetail} />
          <Route exact path="/linkAccount" component={LinkAccount} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <LayoutRoute exact path="/profile" component={Profile} />
          {/* for test */}
          <LayoutRoute exact path="/yoyo" component={Yoyo} />
          {/* <LayoutRoute path="/yoyoComment" component={YoyoComment} /> */}
          <LayoutRoute exact path="/yoyoComment/:id" component={YoyoComment} />
          <LayoutRoute exact path="/yoyoReview" component={YoyoReview} />
          <LayoutRoute exact path="/post/:id" component={Post} />
          <LayoutRoute exact path="/pong" component={eiei} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
