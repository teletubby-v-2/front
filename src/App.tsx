import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
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
import { LayoutRoute, AuthRoute } from './components'
import firebase from 'firebase'
import { userInfoStore } from './store/user.store'
import eiei from './pages/Yoyo/user'
import Post from './pages/Yoyo/Post'
import { UserInfo } from './pages/UserInfo'
import { firestore } from './config/firebase'
import { Collection } from './constants'
import { MyUser } from './constants/interface/myUser.interface'
import { ViewAll } from './pages/ViewAll'
import { Spin } from 'antd'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App: React.FC = () => {
  const { clearAll, setAllFirebase, setAll } = userInfoStore()
  const history = useHistory()

  const [spin, setSpin] = useState(false)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setSpin(true)
        firestore
          .collection(Collection.Users)
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              setAll({ ...doc.data(), userId: doc.id } as MyUser)
            } else {
              history.push('/verifyEmail')
              setAllFirebase(user as firebase.UserInfo)
            }
          })
          .finally(() => setSpin(false))
      } else {
        clearAll()
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
      {spin && (
        <Overlay>
          <Spin tip="Loading..." />
        </Overlay>
      )}
      <Switch>
        <Route exact path="/">
          {/* ชั่วคราวสำหรับ test */}
          <Redirect to="/login" />
        </Route>

        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/forgotpassword" component={ForgotPassword} />
        <AuthRoute exact path="/verifyEmail" component={VerifyEmail} />
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact path="/success" component={Success} />
        <AuthRoute exact path="/subject" component={Subject} />
        <AuthRoute exact path="/createUser" component={UserInfo} />

        <LayoutRoute exact path="/home" component={Home} />
        <LayoutRoute exact path="/lecturedetail" component={LectureDetail} />
        <AuthRoute exact path="/linkAccount" component={LinkAccount} />
        <LayoutRoute exact path="/profile" component={Profile} />
        <LayoutRoute path="/viewAll/:id" component={ViewAll} />

        {/* for test */}
        <LayoutRoute exact path="/yoyo" component={Yoyo} />
        <LayoutRoute exact path="/post/:id" component={Post} />
        <LayoutRoute exact path="/pong" component={eiei} />
        <AuthRoute exact path="*" component={NotFound} />
      </Switch>
    </>
  )
}

export default App
