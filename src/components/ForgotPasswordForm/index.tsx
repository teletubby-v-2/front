import React, { useState } from 'react'
import { Alert, Avatar, Button, Divider, Form, Input, Modal, Space } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

export interface ForgotPasswordFormProps {
  className?: string
  callback?: () => void
  modal?: boolean
  closeModal?: () => void
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  className,
  callback,
  modal,
  closeModal,
}) => {
  const history = useHistory()
  const [isReset, setIsReset] = useState(false)
  const [message, setMessage] = useState<string>()

  const resetPassword = async (value: any) => {
    try {
      const email = value.email
      await firebase.auth().sendPasswordResetEmail(email)
      setIsReset(true)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      setMessage(errorMessage)
    }
  }
  return (
    <div className={className}>
      {isReset ? (
        <>
          <h1 className="text-3xl font-bold ">Send reset password</h1>
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
          <h1 className="text-3xl font-bold mb-6">Forgot your password?</h1>
          <Form layout="vertical" onFinish={resetPassword}>
            <Form.Item
              name="email"
              rules={[{ type: 'email', required: true, message: 'invalid email address' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item className="m-1">
              <Button type="primary" htmlType="submit" size="middle" block>
                Reset password!
              </Button>
            </Form.Item>
          </Form>
          <a
            onClick={() => (modal ? callback && callback() : history.push('/login'))}
            className="text-blue-500"
          >
            <p className="mt-5 text-right">Back to Sign in</p>
          </a>
        </>
      )}
    </div>
  )
}
