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
        <h1 className="text-3xl font-medium mb-6">ลืมรหัสผ่าน?</h1>
        <Form layout="vertical" onFinish={resetPassword}>
          <Form.Item
            label="อีเมลล์"
            labelCol={{ span: 0 }}
            name="email"
            rules={[{ type: 'email' }, { required: true }]}
          >
            <Input prefix={<UserOutlined />} size="large" placeholder="อีเมลล์" />
          </Form.Item>
          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" size="middle" block>
              เปลี่ยนรหัสผ่าน
            </Button>
          </Form.Item>
        </Form>
        <a
          onClick={() => (modal ? callback && callback() : history.push('/login'))}
          className="text-blue-500"
        >
          <p className="text-right -mb-3">กลับไปเข้าสู่ระบบ</p>
        </a>
      </>
    </div>
  )
}
