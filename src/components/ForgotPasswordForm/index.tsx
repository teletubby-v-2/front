import React, { useState } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import firebase from 'firebase'
import { Link, useHistory } from 'react-router-dom'

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
  const [isReset, setIsReset] = useState(false)
  const [message, setMessage] = useState<string>()

  const resetPassword = async (value: any) => {
    try {
      const email = value.email
      await firebase.auth().sendPasswordResetEmail(email)
      setIsReset(true)
    } catch (error) {
      const { message } = error as firebase.firestore.FirestoreError
      setMessage(message)
    }
  }
  return (
    <div className={className}>
      {isReset ? (
        <>
          <h2 className="font-bold ">ส่งลิงก์เปลี่ยนรหัสไปในอีเมลเรียบร้อยแล้ว</h2>
          <div className="w-full text-right">
            <Link to="/login">กลับไปเข้าสู่ระบบ</Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">ลืมรหัสผ่าน?</h1>
          {message && (
            <Alert
              message="เกิดปัญหา"
              description="อีเมลไม่ถูกต้อง"
              type="error"
              showIcon
              style={{ textAlign: 'left', marginBottom: 10 }}
            />
          )}
          <Form layout="vertical" onFinish={resetPassword}>
            <Form.Item
              name="email"
              rules={[{ type: 'email', required: true, message: 'รูปแบบอีเมลไม่ถูกต้อง' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="อีเมล" size="large" />
            </Form.Item>
            <Form.Item className="m-1">
              <Button type="primary" htmlType="submit" size="middle" block>
                เปลี่ยนรหัสผ่าน
              </Button>
            </Form.Item>
          </Form>
          <a
            onClick={() => (modal ? callback && callback() : history.push('/login'))}
            className="text-blue-500"
          >
            <p className="mt-5 text-right">กลับไปเข้าสู่ระบบ</p>
          </a>
        </>
      )}
    </div>
  )
}
