import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userInfoStore } from '../store/user.store'
import { linkWithEmailAndPassword } from '../service/auth'
import { errorStore } from '../store/error.store'
import firebase from 'firebase/app'

export const LinkAccount: React.FC = () => {
  const history = useHistory()

  const { authError } = errorStore()

  const onFinish = (value: any) => {
    linkWithEmailAndPassword(
      value.email,
      value.password,
      authError.credential as firebase.auth.AuthCredential,
    ).then(() => history.push('/success'))
  }

  return (
    <div className={`App grid gap-y-4`}>
      <h1 className="text-2xl font-bold ">ใส่พาสเวิร์ดเพื่อเชื่อมแอคเคาต์</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" initialValue={authError.email} label="Email address">
          <Input placeholder="Email" disabled />
        </Form.Item>
        <Form.Item name="password" label="password">
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item className="m-1">
          <Button type="primary" htmlType="submit" size="middle" block>
            เชื่อมต่อแอคเคาต์
          </Button>
        </Form.Item>
        <Link to="/login" className="flex justify-end mb-2 text-blue-500 text-xs mr-1">
          Back to Sign in
        </Link>
      </Form>
    </div>
  )
}
