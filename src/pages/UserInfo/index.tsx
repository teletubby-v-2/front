import React from 'react'
import { UserInfoForm, UserStep } from '../../components'

export const UserInfo: React.FC = () => {
  return (
    <div className="flex justify-center space-x-2 my-10">
      <UserStep current={2} />
      <UserInfoForm />
    </div>
  )
}
