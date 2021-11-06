import { Button, Card, Form, Input } from 'antd'
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
      <Card className="App">
        <h1 className="text-2xl font-medium ">ใส่พาสเวิร์ดเพื่อเชื่อมแอคเคาต์</h1>
        <Form layout="vertical" onFinish={onFinish} labelCol={{ span: 0 }}>
          <Form.Item
            name="email"
            label="อีเมล"
            initialValue={authError.email}
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" disabled size="large" />
          </Form.Item>
          <Form.Item name="password" label="พาสเวิร์ด" rules={[{ required: true }]}>
            <Input.Password placeholder="password" size="large" />
          </Form.Item>
          <Form.Item className="m-1">
            <Button type="primary" htmlType="submit" size="large" block>
              เชื่อมต่อแอคเคาต์
            </Button>
          </Form.Item>
          <Link to="/login" className="flex justify-end mt-2 -mb-3 text-sm mr-1">
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </Form>
      </Card>
    </div>
  )
}
