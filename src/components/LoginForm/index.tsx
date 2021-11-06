import { Alert, Button, Divider, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import {
  linkAccountWithProvider,
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '../../service/auth'
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
        <h1 className="text-3xl font-medium	mb-5 text-center">เข้าสู่ระบบ</h1>
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
          <div className="flex justify-between px-1 -mt-1 mb-2">
            {modal ? (
              <a onClick={() => callback && callback()}>สร้างบัญชีใหม่</a>
            ) : (
              <Link to="/register">สร้างบัญชีใหม่</Link>
            )}
            {modal ? (
              <a onClick={() => callbackForgot && callbackForgot()}>ลืมรหัสผ่าน?</a>
            ) : (
              <Link to="/forgotpassword">ลืมรหัสผ่าน?</Link>
            )}
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
        <Divider orientation="center">หรือ</Divider>
        <div className="text-center">
          <button
            type="button"
            className="login-with-google-btn"
            onClick={() => signInProvider('google')}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
              alt=""
              className="mr-2 mb-0.5"
            />
            เข้าสู่ระบบผ่าน Google
          </button>
        </div>
      </div>
    </>
  )
}
