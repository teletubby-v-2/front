import React, { useEffect } from 'react'
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
import { LayoutRoute } from './components'
import firebase from 'firebase'
import { userInfoStore } from './store/user.store'

const App: React.FC = () => {
  const { clearAll, setAllFirebase } = userInfoStore()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAllFirebase(user as firebase.UserInfo)
      } else {
        clearAll()
      }
    })
    return () => unsubscribe()
  }, [])
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
          <Route exact path="/verifyEmail" component={VerifyEmail} />
          <LayoutRoute exact path="/profile" component={Profile} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
