import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { NotFound } from './pages'
import { LoadingOutlined } from '@ant-design/icons'
import { LayoutRoute, AuthRoute } from './components'
import firebase from 'firebase'
import { userInfoStore } from './store/user.store'
import { firestore } from './config/firebase'
import { COLLECTION } from './constants'
import { MyUser } from './constants/interface/myUser.interface'
import { Spin } from 'antd'
import styled from 'styled-components'
import { lectureStore } from './store/lecture.store'
import layoutRoutes from './routes'
import authRoutes from './routes/auth'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2001;
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
          .collection(COLLECTION.USERS)
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
        {authRoutes.map((routeProps, index) => (
          <AuthRoute key={`route-auth-${index}`} {...routeProps} />
        ))}
        {layoutRoutes.map((routeProps, index) => (
          <LayoutRoute key={`route-layout-${index}`} {...routeProps} />
        ))}
        <AuthRoute exact path="*" component={NotFound} />
      </Switch>
    </>
  )
}

export default App
