import { Card } from 'antd'
import React from 'react'
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm'

export const ForgotPassword: React.FC = () => {
  return (
    <div className="mt-20">
      <Card className="App ">
        <ForgotPasswordForm />
      </Card>
    </div>
  )
}
