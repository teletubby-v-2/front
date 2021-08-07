import { Modal } from 'antd'
import React from 'react'
import { modalAccountStore } from '../../store/modalAccount.store'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { ForgotPassword } from './components/ForgotPassword'

export interface AccountManageProps {
  className?: string
}

export const AccountManage: React.FC<AccountManageProps> = props => {
  const { isModalVisible, isHaveAccount, isForgotPassword, closeModal } = modalAccountStore()

  return (
    <>
      <Modal
        visible={isModalVisible && !isHaveAccount && !isForgotPassword}
        footer={false}
        width="420px"
        centered
        onCancel={closeModal}
        destroyOnClose={true}
        closable
      >
        <Login />
      </Modal>
      <Modal
        visible={isModalVisible && isHaveAccount && !isForgotPassword}
        centered
        width="420px"
        footer={false}
        onCancel={closeModal}
        closable
        destroyOnClose={true}
      >
        <Register />
      </Modal>
      <Modal
        visible={isModalVisible && isForgotPassword}
        centered
        width="420px"
        footer={false}
        onCancel={closeModal}
        closable
        destroyOnClose={true}
      >
        <ForgotPassword />
      </Modal>
    </>
  )
}
