import { Button, Result, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { firebaseApp } from '../config/firebase'
import { logout } from '../service/auth'
import noUser from '../assets/images/no_user.png'

export const Success: React.FC = () => {
  const history = useHistory()
  const [css, setCss] = useState('')
  const [user, setUser] = useState<firebase.User>()

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        user.getIdToken().then(token => {
          localStorage.setItem('idToken', token)
        })
        if (user.emailVerified) {
          setCss('border-green-500')
        } else {
          setCss('border-red-500')
        }
      } else {
        console.log('invalid user')
      }
    })
  }, [])

  return (
    <>
      <Result
        icon={
          user?.photoURL ? (
            <Avatar
              size={128}
              shape="circle"
              src={user?.photoURL}
              className={`m-auto border-2 ${css}`}
            />
          ) : (
            <Avatar size={128} shape="circle" src={noUser} className={`m-auto border-2 ${css}`} />
          )
        }
        title={user ? user?.displayName : 'loading...'}
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
