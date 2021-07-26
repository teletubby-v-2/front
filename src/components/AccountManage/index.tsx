import { Modal } from 'antd'
import React from 'react'
import { modalAccountStore } from '../../store/modalAccount.store'
import { Register } from './components/Register'
import { Login } from './components/Login'

export interface AccountManageProps {
  className?: string
}

export const AccountManage: React.FC<AccountManageProps> = props => {
  const { isModalVisible, isHaveAccount, closeModal } = modalAccountStore()

  return (
    <>
      {console.log(isModalVisible)}
      <Modal
        visible={isModalVisible && !isHaveAccount}
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
        visible={isModalVisible && isHaveAccount}
        centered
        width="420px"
        footer={false}
        onCancel={closeModal}
        closable
        destroyOnClose={true}
      >
        <Register />
      </Modal>
    </>
  )
}
