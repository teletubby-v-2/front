import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { linkWithEmailAndPassword } from '../../service/auth'
import { errorStore } from '../../store/error.store'
import firebase from 'firebase/app'

interface ILogin {
  email: string
  password: string
}

export const LinkAccount: React.FC = () => {
  const history = useHistory()

  const { authError } = errorStore()

  const onFinish = (value: ILogin) => {
    linkWithEmailAndPassword(
      value.email,
      value.password,
      authError.credential as firebase.auth.AuthCredential,
    ).then(() => history.push('/home'))
  }

  return (
    <div className="mt-10">
      <div className={`App grid  p-5 `}>
        <h1 className="text-2xl font-bold ">ใส่พาสเวิร์ดเพื่อเชื่อมแอคเคาต์</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" initialValue={authError.email}>
            <Input placeholder="Email" disabled size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="password" size="large" />
          </Form.Item>
          <Form.Item className="m-1">
            <Button type="primary" htmlType="submit" size="large" block>
              เชื่อมต่อแอคเคาต์
            </Button>
          </Form.Item>
          <Link to="/login" className="flex justify-end mt-2 -mb-2 text-blue-500 text-xs mr-1">
            Back to login
          </Link>
        </Form>
      </div>
    </div>
  )
}
