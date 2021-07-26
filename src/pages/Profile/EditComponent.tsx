import React from 'react'
import { Button, Divider, Form, Image, Input } from 'antd'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { any } from 'prop-types'

export default function EditComponent({ onfin }: any) {
  const { TextArea } = Input
  const onFinish = (value: any) => {
    onfin()
  }

  return (
    <div className="w-96 content-center justify-center bg-gray-200 flex-initial px-8 py-6 border-4 rounded">
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
          <Input placeholder="Nickname" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Email" prefix={<UserOutlined />} />
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
