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

  return (
    <Card className="App">
      {isAuth &&
        isAuth.length !== 0 &&
        (isAuth[0].value.emailVerified ? <Redirect to="/home" /> : <Redirect to="/verifyEmail" />)}
      {isAuth && isAuth.length !== 0 && <Redirect to="/home" />}
      <RegisterForm />
    </Card>
  )
}
