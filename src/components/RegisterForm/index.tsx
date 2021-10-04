import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../../config/firebase'
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
      <h1 className="text-3xl font-bold mb-5 text-center">ลงชื่อเข้าใช้</h1>
      {isFail && (
        <Alert
          message="ลงชื่อเข้าใช้ไม่สำเร็จ"
          description={message}
          type="error"
          showIcon
          className="m-auto mb-3 text-left"
        />
      )}
      <Form onFinish={onFinish}>
        <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
          <Input placeholder="อีเมล" size="large" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="รหัสผ่าน" size="large" />
        </Form.Item>
        <Form.Item name="comfirmPassword" rules={[{ required: true }]}>
          <Input.Password placeholder="ยืนยันรหัสผ่าน" size="large" />
        </Form.Item>
        <Form.Item className="mb-2">
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            สร้างบัญชีใหม่
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center">
        <a
          onClick={() => (modal ? callback && callback() : history.push('/login'))}
          className="text-blue-500 "
        >
          มีบัญชีเรียบร้อยแล้ว
        </a>
      </div>
    </div>
  )
}
