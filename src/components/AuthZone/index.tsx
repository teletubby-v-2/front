import { Modal } from 'antd'
import React, { useState } from 'react'
import { RegisterForm } from '../RegisterForm'
import { LoginForm } from '../LoginForm'
import { useModal } from '../../hooks/useModal'
import { firebaseApp } from '../../config/firebase'
import { userInfoStore } from '../../store/user.store'

export interface AuthZoneProps {
  className?: string
  noAccount?: boolean
}

export const AuthZone: React.FC<AuthZoneProps> = ({ className, children, noAccount }) => {
  const { show, openModal, closeModal } = useModal()

  const { userInfo } = userInfoStore()

  const [isHaveAccount, setIsHaveAccount] = useState(noAccount)

  const toggleHaveAccount = () => {
    setIsHaveAccount(!isHaveAccount)
  }

  const onHanddleCloseModal = () => {
    closeModal()
    setIsHaveAccount(noAccount)
  }

  const isAuth = () => {
    console.log('hello')

    if (!firebaseApp.auth().currentUser) {
      openModal()
    }
  }

  return (
    <>
      <Modal
        visible={show && !isHaveAccount}
        footer={false}
        width="450px"
        centered
        onCancel={onHanddleCloseModal}
        destroyOnClose
        closable
      >
        <LoginForm modal callback={toggleHaveAccount} closeModal={closeModal} />
      </Modal>
      <Modal
        visible={show && isHaveAccount}
        centered
        width="450px"
        footer={false}
        onCancel={onHanddleCloseModal}
        closable
        destroyOnClose
      >
        <RegisterForm modal callback={toggleHaveAccount} closeModal={closeModal} />
      </Modal>
      <div className={`relative ${className}`}>
        {(!userInfo.userId || userInfo.userId.length === 0) && (
          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{ zIndex: 2000 }}
            onClick={isAuth}
          />
        )}
        {children}
      </div>
    </>
  )
}
