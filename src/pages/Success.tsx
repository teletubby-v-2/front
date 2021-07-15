import { Button, Result, Image, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../config/firebase'
import { logout } from '../utils/auth'
// import { userInfoStore } from 'store/user'
const Success:React.FC<{}> = () => {

  const history = useHistory()
  const [thisUser, setThisUser] = useState<firebase.User>()

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setThisUser(user)
        console.log(uid)
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])

  return (
    <>
      <Result
      icon={thisUser?.photoURL ? <Avatar size={300} shape='circle' src={thisUser.photoURL} className='m-auto border-2' /> : <Avatar size={128} shape='circle' icon={ <UserOutlined/>} className='m-auto border-2 ' />}
      title={ thisUser? thisUser.displayName : 'loading...'}
      extra={<Button type="primary" onClick={() => {logout(); history.push('./login')}}>Logout</Button>}
      />
    </>
  )
}

export default Success
