import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { LoginForm } from '../../components'
import { getUserFromIndexDB } from '../../utils/firebase'

export const Login: React.FC = () => {
  const [isAuth, setIsAuth] = useState<any[]>()

  useEffect(() => {
    getUserFromIndexDB().then((value: any) => setIsAuth(value.firebaseLocalStorage))
  }, [])

  return (
    <Card className="App">
      {isAuth &&
        isAuth.length !== 0 &&
        (isAuth[0].value.emailVerified ? <Redirect to="/home" /> : <Redirect to="/verifyEmail" />)}
      <LoginForm />
      <a href="/home" className="text-right text-blue-500 text-sm -mb-3 block">
        login as guest user
      </a>
    </Card>
  )
}
