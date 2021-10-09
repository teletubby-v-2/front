/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd'
import React from 'react'
import { LoginForm } from '../../components'
import { Link } from 'react-router-dom'
import { SVG_URL } from '../../constants'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const Login: React.FC = () => {
  return (
    <div className="flex justify-center mx-auto items-end my-10 h-full" style={{ maxWidth: 1000 }}>
      <div className="flex-1 hidden md:block">
        <LazyLoadImage src={SVG_URL.LOGIN} alt="" className="flex-1 mr-20 h-96" effect="opacity" />
      </div>
      <Card className="flex-1 App m-0">
        <LoginForm />
        <Link to="/home" className="text-right text-blue-500 text-sm -mb-3 block">
          เข้าสู่ระบบแบบผู้ใช้ทั่วไป
        </Link>
      </Card>
    </div>
  )
}
