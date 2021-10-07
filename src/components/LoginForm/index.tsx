import { Alert, Avatar, Button, Divider, Form, Input, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import {
  linkAccountWithProvider,
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '../../service/auth'
import facebookLogo from '../../assets/images/facebook_logo.png'
import googleLogo from '../../assets/images/google_logo.png'
import twitterLogo from '../../assets/images/twitter_logo.png'
import { firebaseApp } from '../../config/firebase'
import { AuthError } from '../../constants/interface/error.interface'
import { errorStore } from '../../store/error.store'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

export interface LoginFormProps {
  className?: string
  callback?: () => void
  callbackForgot?: () => void
  modal?: boolean
  closeModal?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  className,
  callback,
  modal,
  closeModal,
  callbackForgot,
}) => {
  const { authError, setAuthError } = errorStore()

  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()
  const [method, setMethod] = useState<string>('')

  const onFinish = ({ email = '', password = '' }) => {
    setIsLoading(true)
    signInWithEmailAndPassword(email, password)
      .then(user => {
        closeModal && closeModal()
        if (user.user?.emailVerified) {
          !closeModal && history.push('/home')
        } else {
          history.push('/verifyEmail')
        }
      })
      .catch((error: AuthError) => {
        setMessage(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  const manageSameLogInAccount = (error: AuthError) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      setAuthError(error)
      const email = error.email as string
      firebaseApp
        .auth()
        .fetchSignInMethodsForEmail(email)
        .then(methods => {
          if (methods[0] === 'password') {
            setMethod('อีเมล')
          } else {
            setMethod(' google ')
          }
        })
    }
  }

  useEffect(() => {
    if (method != '') {
      Modal.warning({
        title: `ล็อคอินไม่สำเร็จ`,
        content: `แอคเค้าของคุณเคยล็อคอินด้วยรูปแบบของ${method}ไปแล้ว ต้องการที่จะเชื่อมต่อแอคเคาต์ไหม`,
        okText: 'เชื่อมต่อแอคเคาต์',
        onOk: () => {
          if (method === 'อีเมล') {
            closeModal && closeModal()
            history.push('/linkAccount')
          } else {
            linkAccountWithProvider(
              authError.email as string,
              authError.credential as firebase.auth.AuthCredential,
            ).then(user => {
              closeModal && closeModal()
              if (user?.user?.emailVerified) {
                !closeModal && history.push('/home')
              } else {
                history.push('/verifyEmail')
              }
            })
          }
        },
        closable: true,
      })
      setMethod('')
    }
  }, [authError.credential, authError.email, closeModal, history, method])

  const signInProvider = (provider: string) => {
    switch (provider) {
      case 'google':
        return signInWithGoogle()
          .then(() => {
            !closeModal && history.push('/home')
            closeModal && closeModal()
          })
          .catch((error: AuthError) => manageSameLogInAccount(error))
      case 'facebook':
        return signInWithFacebook()
          .then(user => {
            closeModal && closeModal()
            if (user.user?.emailVerified) {
              !closeModal && history.push('/home')
            } else {
              history.push('/verifyEmail')
            }
          })
          .catch((error: AuthError) => manageSameLogInAccount(error))
      case 'twitter':
        return signInWithTwitter()
          .then(user => {
            closeModal && closeModal()
            if (user.user?.emailVerified) {
              !closeModal && history.push('/home')
            } else {
              history.push('/verifyEmail')
            }
          })
          .catch((error: AuthError) => manageSameLogInAccount(error))
    }
  }

  return (
    <>
      <div className={className}>
        <h1 className="text-3xl font-bold	mb-5 text-center">เข้าสู่ระบบ</h1>
        {message && (
          <Alert
            message="เข้าสู่ระบบไม่สำเร็จ"
            description={message}
            type="error"
            showIcon
            className="m-auto text-left mb-3"
          />
        )}
        <Form onFinish={onFinish} labelCol={{ span: 0 }}>
          <Form.Item label="อีเมลล์" name="email" rules={[{ type: 'email', required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="อีเมล" size="large" />
          </Form.Item>
          <Form.Item label="รหัสผ่าน" name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<KeyOutlined />} placeholder="รหัสผ่าน" size="large" />
          </Form.Item>
          <div className="flex justify-between px-1 -mt-1">
            <a
              className="text-blue-500"
              onClick={() => (modal ? callback && callback() : history.push('/register'))}
            >
              สร้างบัญชีใหม่
            </a>
            <a
              onClick={() =>
                modal ? callbackForgot && callbackForgot() : history.push('/forgotpassword')
              }
              className="flex justify-end mb-2 text-blue-500 "
            >
              ลืมรหัสผ่าน?
            </a>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
        <Divider orientation="center">หรือ</Divider>
        <div className="text-center">
          <p className="mb-2">เข้าสู่ระบบผ่านผู้ให้บริการ</p>
          <Space size="large" className="pb-2">
            <a onClick={() => signInProvider('facebook')}>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={facebookLogo}
              />
            </a>
            <a onClick={() => signInProvider('google')}>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={googleLogo}
              />
            </a>
            <a onClick={() => signInProvider('twitter')}>
              <Avatar
                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125"
                size="large"
                src={twitterLogo}
              />
            </a>
          </Space>
        </div>
      </div>
    </>
  )
}
