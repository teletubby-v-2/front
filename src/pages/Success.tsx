import { Button, Result, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../config/firebase'
import { logout } from '../service/auth'
import noUser from '../assets/images/no_user.png'
// import { userInfoStore } from 'store/user'
const Success: React.FC<{}> = () => {
  const history = useHistory()
  const [css, setCss] = useState('')

  useEffect(() => {
    console.log(firebaseApp.auth().currentUser)
    if (firebaseApp.auth().currentUser?.emailVerified) {
      setCss('border-green-500')
    } else {
      setCss('border-red-500')
    }
  }, [])

  return (
    <>
      <Result
        icon={
          firebaseApp.auth().currentUser?.photoURL ? (
            <Avatar
              size={128}
              shape="circle"
              src={firebaseApp.auth().currentUser?.photoURL}
              className={`m-auto border-2 ${css}`}
            />
          ) : (
            <Avatar size={128} shape="circle" src={noUser} className={`m-auto border-2 ${css}`} />
          )
        }
        title={
          firebaseApp.auth().currentUser
            ? firebaseApp.auth().currentUser?.displayName
            : 'loading...'
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              logout()
              history.push('./login')
            }}
          >
            Logout
          </Button>
        }
      />
    </>
  )
}

export default Success
