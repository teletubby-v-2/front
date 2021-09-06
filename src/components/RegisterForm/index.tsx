import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../../config/firebase'
import { userInfoStore } from '../../store/user.store'
import firebase from 'firebase/app'
export interface RegisterFormProps {
  className?: string
  callback?: () => void
  modal?: boolean
  closeModal?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  className,
  callback,
  modal,
  closeModal,
}) => {
  const history = useHistory()
  const [isFail, setIsFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()
  const { setUserName } = userInfoStore()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (value: any) => {
    if (value.password !== value.comfirmPassword) {
      setMessage('Password and comfirm password is not collabed')
      return setIsFail(true)
    }
    setIsLoading(true)
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(userCredentail => {
        userCredentail.user?.updateProfile({ displayName: value.userName })
        setUserName(value.userName)
        return userCredentail
      })
      .then(user => {
        closeModal && closeModal()
        if (user.user?.emailVerified) {
          !closeModal && history.push('/home')
        } else {
          history.push('/verifyEmail')
        }
      })
      .catch(error => {
        setMessage(error.message)
        setIsFail(true)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold mb-5 text-center">Sign Up</h1>
      {isFail && (
        <Alert
          message="Error"
          description={message}
          type="error"
          showIcon
          className="m-auto mb-3 text-left"
        />
      )}
      <Form onFinish={onFinish}>
        <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
          <Input placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item name="userName" rules={[{ required: true }]}>
          <Input placeholder="username" size="large" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="password" size="large" />
        </Form.Item>
        <Form.Item name="comfirmPassword" rules={[{ required: true }]}>
          <Input.Password placeholder="comfirm password" size="large" />
        </Form.Item>
        <Form.Item className="mb-2">
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center">
        <a
          onClick={() => (modal ? callback && callback() : history.push('/login'))}
          className="text-blue-500 "
        >
          already have account
        </a>
      </div>
    </div>
  )
}
