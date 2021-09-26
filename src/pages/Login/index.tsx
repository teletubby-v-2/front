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

  if (isAuth && isAuth.length !== 0) {
    if (isAuth[0].value.emailVerified) {
      return <Redirect to="/home" />
    } else {
      return <Redirect to="/verifyEmail" />
    }
  }

  return (
    <div className="flex justify-center mx-auto items-end my-10 h-full" style={{ maxWidth: 1000 }}>
      <div className="flex-1 hidden md:block">
        <img src={loginIcon} alt="" className="flex-1 mr-20 h-96" />{' '}
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
          เข้าสู่ระบบแบบผู้ใช้ทั่วไป
        </a>
      </Card>
    </div>
  )
}
