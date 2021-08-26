import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { RegisterForm } from '../RegisterForm'
import { LoginForm } from '../LoginForm'
import { useModal } from '../../hooks/useModal'
import { firebaseApp } from '../../config/firebase'
import { ForgotPasswordForm } from '../ForgotPasswordForm'

export interface AuthZoneProps {
  className?: string
  noAccount?: boolean
  update?: boolean
}

export const AuthZone: React.FC<AuthZoneProps> = ({ className, children, noAccount, update }) => {
  const { show, openModal, closeModal } = useModal()
  const [isHaveAccount, setIsHaveAccount] = useState(false)
  const [Forgot, setForgot] = useState(false)

  const toggleHaveAccount = () => {
    setIsHaveAccount(!isHaveAccount)
  }

  const isAuth = () => {
    if (!firebaseApp.auth().currentUser) {
      openModal()
    }
  }

  useEffect(() => {
    setIsHaveAccount(noAccount ? true : false)
  }, [noAccount, update])

  useEffect(() => {
    if (!show) {
      setForgot(false)
    }
  }, [show])

  return (
    <>
      <Modal
        visible={show && !isHaveAccount && !Forgot}
        footer={false}
        width="420px"
        centered
        onCancel={closeModal}
        destroyOnClose={true}
        closable
      >
        <LoginForm
          modal
          callback={toggleHaveAccount}
          closeModal={closeModal}
          callbackForgot={() => setForgot(true)}
        />
      </Modal>
      <Modal
        visible={show && isHaveAccount}
        centered
        width="420px"
        footer={false}
        onCancel={closeModal}
        closable
        destroyOnClose={true}
      >
        <RegisterForm modal callback={toggleHaveAccount} closeModal={closeModal} />
      </Modal>
      <Modal
        visible={show && !isHaveAccount && Forgot}
        centered
        width="420px"
        footer={false}
        onCancel={closeModal}
        closable
        destroyOnClose={true}
      >
        <ForgotPasswordForm modal callback={() => setForgot(false)} closeModal={closeModal} />
      </Modal>
      <div onClick={isAuth} className={className}>
        {children}
      </div>
    </>
  )
}
