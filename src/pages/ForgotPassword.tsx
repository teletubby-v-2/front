import { Alert, Button, Form, Input } from 'antd'
import firebase from 'firebase'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export const ForgotPassword: React.FC = () => {
  const history = useHistory()
  const [isReset, setIsReset] = useState(false)
  const [message, setMessage] = useState<string>()

  const resetPassword = async (value: any) => {
    try {
      const email = value.email
      await firebase.auth().sendPasswordResetEmail(email)
      setIsReset(true)
      history.push('/login')
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      setMessage(errorMessage)
    }
  }

  return (
    <div className="App grid gap-y-4 text-left">
      {isReset ? (
        <>
          <h1 className="text-3xl font-bold ">Send reset password</h1>
          <Link to="/login" className="flex justify-end mb-2 text-blue-500 text-xs mr-1">
            Back to Sign in
          </Link>
        </>
      ) : (
        <>
          {message && (
            <Alert
              message="Error"
              description={message}
              type="error"
              showIcon
              style={{ textAlign: 'left', marginBottom: 10 }}
            />
          )}
          <h1 className="text-3xl font-bold ">Forgot your password?</h1>
          <Form layout="vertical" onFinish={resetPassword}>
            <Form.Item
              className="text-left"
              name="email"
              label="Email address"
              rules={[{ type: 'email', required: true, message: 'invalid email address' }]}
            >
              <Input placeholder="Email"></Input>
            </Form.Item>
            <Form.Item className="m-1">
              <Button type="primary" htmlType="submit" size="middle" block>
                Reset password!
              </Button>
            </Form.Item>
            <Link to="/login" className="flex justify-end mb-2 text-blue-500 text-xs mr-1">
              Back to Sign in
            </Link>
          </Form>
        </>
      )}
    </div>
  )
}
