/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { LoginForm } from '../../components'
import { getUserFromIndexDB } from '../../utils/firebase'
import loginIcon from '../../assets/icons/login_icon.svg'
export const Login: React.FC = () => {
  const [isAuth, setIsAuth] = useState<any[]>()

  useEffect(() => {
    getUserFromIndexDB().then((value: any) => setIsAuth(value.firebaseLocalStorage))
  }, [])

  return (
    <div className="flex justify-center mx-auto items-center mt-20" style={{ maxWidth: 1000 }}>
      <div>
        <img src={loginIcon} alt="" className="flex-1 mr-20 h-92" />{' '}
      </div>
      <Card className="flex-1 App m-0">
        {isAuth &&
          isAuth.length !== 0 &&
          (isAuth[0].value.emailVerified ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/verifyEmail" />
          ))}
        <LoginForm />
        <a href="/home" className="text-right text-blue-500 text-sm -mb-3 block">
          login as guest user
        </a>
      </Card>
    </div>
  )
}
