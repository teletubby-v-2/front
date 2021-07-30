import React from 'react'
import { Button, Divider, Form, Image, Input } from 'antd'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'

export function EditComponent({ onfin }: any) {
  const { email, displayName, photoURL } = userInfoStore()
  const { TextArea } = Input
  const onFinish = (value: any) => {
    onfin()
  }

  return (
    <div className="mx-10 my-10">
      <h1 className="text-center text-2xl">Placeholder</h1>
      <Image />
      <div className="text-center">
        <Button className="w-48">
          <RightOutlined />
          change Image
        </Button>
      </div>
      <Form onFinish={onFinish}>
        <Divider>General</Divider>
        <Form.Item name="nickname">
          <Input placeholder="Nickname" defaultValue={displayName} />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Email" prefix={<UserOutlined />} defaultValue={email} />
        </Form.Item>
        <Form.Item name="aboutme">
          <TextArea showCount maxLength={300} placeholder="about me" />
        </Form.Item>
        <Divider>Social Link</Divider>
        <Form.Item name="instagram">
          <Input addonBefore="https://" defaultValue="mysite.com" placeholder="Instagram" />
        </Form.Item>
        <Form.Item name="facebook">
          <Input addonBefore="https://" defaultValue="mysite.com" placeholder="Facebook" />
        </Form.Item>
        <Form.Item name="youtube">
          <Input addonBefore="https://" defaultValue="mysite.com" placeholder="Youtube" />
        </Form.Item>
        <Form.Item className="m-3 text-center">
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
