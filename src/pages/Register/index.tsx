/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { RegisterForm } from '../../components'
import { getUserFromIndexDB } from '../../utils/firebase'

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
    <Card className="App">
      <RegisterForm />
    </Card>
  )
}
