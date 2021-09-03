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
  Success,
  Subject,
} from './pages'
import Yoyo from './pages/Yoyo'
import { LayoutRoute, FirstRoute, AuthRoute } from './components'
import firebase from 'firebase'
import { userInfoStore } from './store/user.store'
import eiei from './pages/Yoyo/user'
import Post from './pages/Yoyo/Post'
import { UserInfo } from './pages/UserInfo'
import { firestore } from './config/firebase'
import { Collection } from './constants'
import { MyUser } from './constants/interface/myUser.interface'

const App: React.FC = () => {
  const { clearAll, setAllFirebase, setAll } = userInfoStore()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firestore
          .collection(Collection.Users)
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              setAll({ ...doc.data(), userId: doc.id } as MyUser)
            } else {
              setAllFirebase(user as firebase.UserInfo)
            }
          })
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
            {/* ชั่วคราวสำหรับ test */}
            <Redirect to="/login" />
          </Route>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <LayoutRoute exact path="/home" component={Home} />
          <LayoutRoute exact path="/lecturedetail" component={LectureDetail} />
          <AuthRoute exact path="/linkAccount" component={LinkAccount} />
          <AuthRoute exact path="/forgotpassword" component={ForgotPassword} />
          <AuthRoute exact path="/verifyEmail" component={VerifyEmail} />
          <LayoutRoute exact path="/profile" component={Profile} />
          {/* for test */}
          <LayoutRoute exact path="/yoyo" component={Yoyo} />
          <LayoutRoute exact path="/post/:id" component={Post} />
          <LayoutRoute exact path="/pong" component={eiei} />
          <LayoutRoute exact path="/createUser" component={UserInfo} />
          <AuthRoute exact path="/success" component={Success} />
          <AuthRoute exact path="/subject" component={Subject} />
          <AuthRoute exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
