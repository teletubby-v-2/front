import { Alert, Avatar, Button, Divider, Form, Input, Space } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '../utils/auth'
import facebookLogo from '../assets/images/facebook_logo.png'
import googleLogo from '../assets/images/google_logo.png'
import twitterLogo from '../assets/images/twitter_logo.png'
// import { userInfoStore } from '../store/user'

const Login: React.FC<{}> = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  // const { setAll } = userInfoStore()

  const onFinish = (value: any) => {
    setIsLoading(true)
    signInWithEmailAndPassword(value.email, value.password)
      .then(userCredential => {
        console.log(userCredential.user)
        // if (userCredential.user){
        //   setAll(userCredential.user)
        // }
        history.push('/success')
      })
      .catch(error => {
        console.log(error.message)
        setMessage(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  const signInProvider = (provider: string) => {
    switch (provider) {
      case 'google':
        return signInWithGoogle()
          .then(() => history.push('/success'))
          .catch(error => setMessage(error.message || 'cant login'))
      case 'facebook':
        return signInWithFacebook()
          .then(() => history.push('/success'))
          .catch(error => setMessage(error.message || 'cant login'))
      case 'twitter':
        return signInWithTwitter()
          .then(() => history.push('/success'))
          .catch(error => setMessage(error.message || 'cant login'))
    }
  }

  return (
    <div className="App">
      <h1 className="text-3xl font-bold	" style={{ marginBottom: 20 }}>
        Login
      </h1>
      {message && (
        <Alert
          message="Error"
          description={message}
          type="error"
          showIcon
          style={{ textAlign: 'left', marginBottom: 10 }}
        />
      )}
      <Form onFinish={onFinish}>
        <Form.Item name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 5 }}>
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            login
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation="center">or</Divider>
      <p className="mb-2">sign in with your social media account</p>
      <Space size="middle" style={{ paddingBottom: 7 }}>
        <a onClick={() => signInProvider('facebook')}>
          <Avatar
            className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-125"
            size="default"
            src={facebookLogo}
          />
        </a>
        <a onClick={() => signInProvider('google')}>
          <Avatar
            className="transition duration-250 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-125"
            size="default"
            src={googleLogo}
          />
        </a>
        <a onClick={() => signInProvider('twitter')}>
          <Avatar
            className="transition duration-250 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-125"
            size="default"
            src={twitterLogo}
          />
        </a>
      </Space>
      <br />
      <a href="#/register" className="text-blue-500">
        no account
      </a>
    </div>
  )
}

export default Login
