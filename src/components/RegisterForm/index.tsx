import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { firebaseApp } from '../../config/firebase'
export interface RegisterFormProps {
  className?: string
  callback?: () => void
  modal?: boolean
  closeModal?: () => void
}

interface ICreateUser {
  email: string
  password: string
  comfirmPassword: string
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

  const onFinish = (value: ICreateUser) => {
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
      <h1 className="text-3xl font-medium mb-5 text-center">สมัครสมาชิก</h1>
      {isFail && (
        <Alert
          message="สมัครสมาชิกไม่สำเร็จ"
          description={message}
          type="error"
          showIcon
          className="m-auto mb-3 text-left"
        />
      )}
      <Form onFinish={onFinish} labelCol={{ span: 0 }}>
        <Form.Item name="email" label="อีเมลล์" rules={[{ type: 'email', required: true }]}>
          <Input placeholder="อีเมล" size="large" />
        </Form.Item>
        <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true }]}>
          <Input.Password placeholder="รหัสผ่าน" size="large" />
        </Form.Item>
        <Form.Item
          name="comfirmPassword"
          rules={[{ required: true, message: 'กรุณายืนยันรหัสผ่าน' }]}
        >
          <Input.Password placeholder="ยืนยันรหัสผ่าน" size="large" />
        </Form.Item>
        <Form.Item className="mb-2">
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            สร้างบัญชีใหม่
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center">
        {modal ? (
          <a onClick={() => callback && callback()} className="text-blue-500 ">
            มีบัญชีเรียบร้อยแล้ว
          </a>
        ) : (
          <Link to="/login" className="text-blue-500 ">
            มีบัญชีเรียบร้อยแล้ว
          </Link>
        )}
      </div>
    </div>
  )
}
