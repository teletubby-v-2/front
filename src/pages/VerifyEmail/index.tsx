import React, { useEffect, useState } from 'react'
import kushare from '../../assets/icons/KUshare.svg'
import { Button, Card } from 'antd'
import { firebaseApp } from '../../config/firebase'
import { useHistory } from 'react-router'
import { logout } from '../../service/auth'

export const VerifyEmail: React.FC = () => {
  const [isClick, setIsClick] = useState(false)
  const history = useHistory()

  const handleVerifyEmail = () => {
    if (firebaseApp.auth().currentUser) {
      firebaseApp
        .auth()
        .currentUser?.sendEmailVerification()
        .then(() => setIsClick(true))
    }
  }

  useEffect(() => {
    const unsub = setInterval(() => {
      if (firebaseApp.auth().currentUser) {
        firebaseApp
          .auth()
          .currentUser?.reload()
          .then(() => {
            if (firebaseApp.auth().currentUser?.emailVerified) {
              history.push('/home')
            }
          })
      } else {
        history.push('/login')
      }
    }, 1000)
    return () => clearInterval(unsub)
  }, [])

  const handleLoginAsGuest = () => {
    logout().then(() => history.push('/home'))
  }

  return (
    <div className="flex flex-col items-center text-center">
      <img src={kushare} alt="" width="200px" className="p-10" />
      <Card className="verify-card">
        <div className="space-y-5">
          <p className="text-2xl font-bold">Verify your email address</p>
          <p className="text-sm text-gray-500">
            Please confirm that you want to want to use thsi as Selify account
            <br /> email address. Once it’s done you will be able to start{' '}
          </p>
          <Button type={isClick ? 'default' : 'primary'} block onClick={handleVerifyEmail}>
            {isClick ? 'Resend Verification Email' : 'Verify My Email'}
          </Button>
        </div>
        <a
          onClick={handleLoginAsGuest}
          className="text-right text-blue-500 mt-1 text-sm -mb-3 block"
        >
          login as guest user
        </a>
      </Card>
    </div>
  )
}
