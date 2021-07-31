import React from 'react'
import { Button, Divider, Form, Image, Input } from 'antd'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'
import { firebaseApp } from '../../../../config/firebase'

export function EditComponent({ onfin }: any) {
  const { userInfo } = userInfoStore()
  const { TextArea } = Input

  const onFinish = (value: any) => {
    const user = firebaseApp.auth().currentUser
    user
      ?.updateProfile({
        displayName: value.username,
        photoURL: value.email,
      })
      .then(() => {
        onfin()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="mx-10 my-10">
      <h1 className="text-center text-2xl">Edit</h1>
      <img src={userInfo.photoURL} />
      <div className="text-center">
        <Button className="w-48">
          <RightOutlined />
          change Image
        </Button>
      </div>
      <Form onFinish={onFinish}>
        <Divider>General</Divider>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="username" defaultValue={userInfo.displayName} />
        </Form.Item>
        <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
          <Input placeholder="email" prefix={<UserOutlined />} defaultValue={userInfo.email} />
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
          <Button type="primary" htmlType="submit" size="large" className="mx-4">
            Save
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              onfin()
            }}
            className="mx-4"
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
