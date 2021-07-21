import { Button, Divider, Form, Input, Modal, Space, Avatar } from 'antd'
import { ok } from 'assert'
import React from 'react'
import { Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import facebookLogo from '../../assets/images/facebook_logo.png'
import googleLogo from '../../assets/images/google_logo.png'
import twitterLogo from '../../assets/images/twitter_logo.png'

export const Login: React.FC = () => {
  function info() {
    Modal.info({
      title: (
        <Typography.Title level={2} className="text-center">
          Sign in
        </Typography.Title>
      ),
      icon: <></>,
      content: (
        <div>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                size="large"
              >
                Log in
              </Button>
            </Form.Item>
            <div className="flex justify-between text-blue-500">
              <a href="">register now</a>
              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </div>
          </Form>
          <Divider plain>Or</Divider>
          <p className="mb-2 text-center">sign in with your social media account</p>
          <Space size="large" className="pb-2 flex justify-center">
            <a>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={facebookLogo}
              />
            </a>
            <a>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={googleLogo}
              />
            </a>
            <a>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={twitterLogo}
              />
            </a>
          </Space>
        </div>
      ),
      closable: true,
      okButtonProps: { style: { display: 'none' } },
    })
  }
  return (
    <div>
      <Button onClick={info}>Info</Button>
    </div>
  )
}
