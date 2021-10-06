import React, { useState } from 'react'
import { Alert, Button, Form, Input, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
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
}) => {
  const history = useHistory()
  const [message, setMessage] = useState<string>()

  const resetPassword = async ({ email = '' }) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      success()
    } catch (error) {
      // const errorCode = error.code
      const { message } = error as firebase.firestore.FirestoreError
      setMessage(message)
    }
  }
  function success() {
    Modal.success({
      centered: true,
      onOk: () => history.push('/login'),
      content: 'ส่งเมลยืนยันการเปลี่ยนรหัสแล้ว',
    })
  }
  return (
    <div className={className}>
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
          <p className="mt-5 text-right -mb-3">Back to login</p>
        </a>
      </>
    </div>
  )
}
