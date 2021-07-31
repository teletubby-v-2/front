import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../../../config/firebase'
import { modalAccountStore } from '../../../store/modalAccount.store'

export const Register: React.FC = () => {
  const { toggleHaveAccount, closeModal } = modalAccountStore()

  const history = useHistory()
  const [isFail, setIsFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

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
        userCredentail.user?.updateProfile({ displayName: value.username })
      })
      .then(() => {
        history.push('/success')
        closeModal()
      })
      .catch(error => {
        setMessage(error.message)
        setIsFail(true)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
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
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="rules={[{ type: 'email', required: true }]}" size="large" />
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
        <a onClick={toggleHaveAccount} className="text-blue-500 ">
          already have account
        </a>
      </div>
    </div>
  )
}
