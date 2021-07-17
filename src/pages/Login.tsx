import { Alert, Avatar, Button, Divider, Form, Input, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  linkAccountWithProvider,
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '../utils/auth'
import facebookLogo from '../assets/images/facebook_logo.png'
import googleLogo from '../assets/images/google_logo.png'
import twitterLogo from '../assets/images/twitter_logo.png'
import { userInfoStore } from '../store/user.store'
import { firebaseApp } from '../config/firebase'

const Login: React.FC<{}> = () => {

  const { setError,email,error } = userInfoStore()

  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()
  const { setAll } = userInfoStore()
  const [method, setMethod] = useState<string>('')

  const { setEmail } = userInfoStore()

  const onFinish = (value: any) => {
    setIsLoading(true)
    signInWithEmailAndPassword(value.email, value.password)
      .then(userCredential => {
        console.log(userCredential.user)
        if (userCredential.user){
          setAll(userCredential.user)
        }
        history.push('/success')
      })
      .catch(error => {
        console.log(error)
        setMessage(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  const manageSameLogInAccount = (error: any) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      setError(error)
      const email = error.email
      firebaseApp.auth().fetchSignInMethodsForEmail(email).then((methods) => {
        setEmail(error.email)
        if( methods[0] === 'password' ){
          setMethod('อีเมล')
        }
        else {
          setMethod(' google ')
        }
      })
    }
  }

  useEffect(() => {
    if(method != ''){
      warning()
      setMethod('')
    }
  }, [method])

  const linkAccount = () => {
    console.log(method === 'password')
    if ( method === 'อีเมล' ) {
      history.push('/linkAccount')
    } else {
      console.log(email)
      linkAccountWithProvider(email as string,error.credential).then(() => {
        history.push('/success')
      })
    }
  }

  function warning() {
    Modal.warning({
      title: `ล็อคอินไม่สำเร็จ`,
      content: `แอคเค้าของคุณเคยล็อคอินด้วยรูปแบบของ${method}ไปแล้ว ต้องการที่จะเชื่อมต่อแอคเคาต์ไหม`,
      okText: 'เชื่อมต่อแอคเคาต์',
      onOk: () => {
        linkAccount()
      },
      closable: true,
    });
  }

  const signInProvider = (provider: string) => {
    switch (provider) {
      case 'google':
        return signInWithGoogle()
          .then(() => history.push('/success'))
          .catch(error => manageSameLogInAccount(error))
      case 'facebook':
        return signInWithFacebook()
          .then(() => history.push('/success'))
          .catch(error => manageSameLogInAccount(error))
      case 'twitter':
        return signInWithTwitter()
          .then(() => history.push('/success'))
          .catch(error => manageSameLogInAccount(error))
    }
  }

  return (
    <>
    <Modal>

    </Modal>
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
        <Form.Item className="mb-1" name="password">
          <Input.Password placeholder="password" />
        </Form.Item>
        <a href="#/forgotpassword" className="flex justify-end mb-2 text-blue-500 text-xs">
          forgot password
        </a>
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
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
            size="default"
            src={facebookLogo}
          />
        </a>
        <a onClick={() => signInProvider('google')}>
          <Avatar
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
            size="default"
            src={googleLogo}
          />
        </a>
        <a onClick={() => signInProvider('twitter')}>
          <Avatar
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
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
    </>
  )
}

export default Login
