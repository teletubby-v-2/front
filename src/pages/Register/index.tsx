/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { RegisterForm } from '../../components'
import { getUserFromIndexDB } from '../../utils/firebase'
import regisIcon from '../../assets/icons/register_icon.svg'
export const Register: React.FC = () => {
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
    <div className="flex justify-center mx-auto items-center mt-20" style={{ maxWidth: 1000 }}>
      <div>
        <img src={regisIcon} alt="" className="flex-1 mr-20 h-92" />{' '}
      </div>
      <Card className="flex-1 App m-0">
        {isAuth &&
          isAuth.length !== 0 &&
          (isAuth[0].value.emailVerified ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/verifyEmail" />
          ))}
        <RegisterForm />
      </Card>
    </div>
  )
}
