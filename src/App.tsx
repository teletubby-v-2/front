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
  VerifyEmail,
  Success,
  Subject,
  LectureDetail,
} from './pages'
import { LoadingOutlined } from '@ant-design/icons'
import { LayoutRoute, AuthRoute } from './components'
import firebase from 'firebase'
import { userInfoStore } from './store/user.store'
import { UserInfo } from './pages/UserInfo'
import { firestore } from './config/firebase'
import { Collection } from './constants'
import { MyUser } from './constants/interface/myUser.interface'
import { ViewAll } from './pages/ViewAll'
import { Spin } from 'antd'
import styled from 'styled-components'
import { lectureStore } from './store/lecture.store'
import { SelectProfile } from './pages/SelectProfile'
import { FollowList } from './pages/FollowList'
import { SearchResult } from './pages/SearchResult'
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
  const { setOwnLecture } = lectureStore()
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
        setOwnLecture([])
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      {spin && (
        <Overlay>
          <Spin tip="Loading..." indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </Overlay>
      )}
      <Switch>
        <Route exact path="/">
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
        <LayoutRoute exact path="/lecturedetail/:lectureId" component={LectureDetail} />
        <AuthRoute exact path="/linkAccount" component={LinkAccount} />
        <LayoutRoute exact path="/profile" component={Profile} />
        <LayoutRoute path="/viewAll/:id" component={ViewAll} />
        <LayoutRoute path="/profile/:userId" component={SelectProfile} />
        <LayoutRoute path="/follow/:userId/:type" component={FollowList} />
        <LayoutRoute path="/searchResult" component={SearchResult} />
        <AuthRoute exact path="*" component={NotFound} />
      </Switch>
    </>
  )
}

export default App
