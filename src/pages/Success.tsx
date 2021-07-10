import { Button, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { firebaseApp } from 'config/firebase'
import { logout } from 'utils/auth'
import firebase from 'firebase/app'
const Success = () => {

  const history = useHistory()

  const [user, setUser] = useState<firebase.User>()

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setUser(user)
        console.log(uid)
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])

  return (
    <Result
    icon={<SmileOutlined />}
    title={user?.displayName? `Welcome! ${user.displayName}` : 'loading...'}
    extra={<Button type="primary" onClick={() => {logout(); history.push('./login')}}>Logout</Button>}
    />
  )
}

export default Success
