import React, { useState } from 'react'
import kushare from '../../assets/icons/KUshare.svg'
import { Button, Card } from 'antd'
import { firebaseApp } from '../../config/firebase'

export const VerifyEmail: React.FC = () => {
  const [isClick, setIsClick] = useState(false)
  const handleVerifyEmail = () => {
    if (firebaseApp.auth().currentUser) {
      firebaseApp
        .auth()
        .currentUser?.sendEmailVerification()
        .then(() => setIsClick(true))
    }
  }
  return (
    <div className="flex flex-col items-center text-center">
      <img src={kushare} alt="" width="200px" className="p-10" />
      <Card style={{ maxWidth: 700, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className="space-y-5">
          <p className="text-2xl font-bold">Verify your email address</p>
          <p className="text-sm text-gray-500">
            Please confirm that you want to want to use thsi as Selify account
            <br /> email address. Once it’s done you will be able to start{' '}
          </p>
          <Button type={isClick ? 'default' : 'primary'} block onClick={handleVerifyEmail}>
            {isClick ? 'Resend Verification Email' : 'Verify My Email'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
