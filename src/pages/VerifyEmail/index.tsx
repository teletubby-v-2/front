import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { firebaseApp } from '../../config/firebase'
import { useHistory } from 'react-router'
import { logout } from '../../service/auth'
import { UserStep } from '../../components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SVG_URL } from '../../constants'

export const VerifyEmail: React.FC = () => {
  const [isClick, setIsClick] = useState(false)
  const history = useHistory()

  const handleVerifyEmail = () => {
    if (firebaseApp.auth().currentUser) {
      firebaseApp
        .auth()
        .currentUser?.sendEmailVerification()
        .then(() => setIsClick(true))
    }
  }

  useEffect(() => {
    const unsub = setInterval(() => {
      if (firebaseApp.auth().currentUser) {
        firebaseApp
          .auth()
          .currentUser?.reload()
          .then(() => {
            if (firebaseApp.auth().currentUser?.emailVerified) {
              history.replace('/createUser')
            }
          })
      } else {
        history.replace('/login')
      }
    }, 1000)
    return () => clearInterval(unsub)
  }, [])

  const handleLoginAsGuest = () => {
    logout().then(() => history.replace('/login'))
  }

  return (
    <div className="flex justify-center text-center my-10">
      <UserStep current={1} />
      <Card className="verify-card main-shadow" style={{ width: 700 }} bordered>
        <div className="space-y-10">
          <p className="text-sm text-gray-500 mb-20">ขอบคุณสำหรับการสมัครสมาชิก</p>
          <LazyLoadImage
            src={SVG_URL.MAIL}
            alt=""
            width="150px"
            className="mx-auto"
            effect="opacity"
          />
          <p className="text-2xl font-medium">ยืนยันอีเมลของคุณ</p>
          <p className="text-sm text-gray-500">
            โปรดยืนยันว่าคุณต้องการใช้บัญชีอีเมลนี้ โดยคลิกลิงค์ที่เราส่งให้คุณ
            <br /> เพื่อเสร็จสิ้นขั้นตอนการสมัคร{' '}
          </p>
          <Button
            type={isClick ? 'default' : 'primary'}
            block
            className="w-2/5"
            size="large"
            onClick={handleVerifyEmail}
          >
            {isClick ? 'ส่งยื่นยันอีเมลอีกครั้ง' : 'ยื่นยันอีเมล'}
          </Button>
        </div>
        <a onClick={handleLoginAsGuest} className="text-blue-500 mt-5 text-sm block">
          กลับไปหน้าแรก
        </a>
      </Card>
    </div>
  )
}
