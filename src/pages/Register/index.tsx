/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd'
import React from 'react'
import { RegisterForm } from '../../components'
import { SVG_URL } from '../../constants'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const Register: React.FC = () => {
  return (
    <div className="flex justify-center mx-auto items-end my-10" style={{ maxWidth: 1000 }}>
      <div className="flex-1 hidden md:block">
        <LazyLoadImage
          src={SVG_URL.REGISTER}
          alt=""
          className="flex-1 mr-20 h-96"
          effect="opacity"
        />{' '}
      </div>
      <Card className="flex-1 App m-0">
        <RegisterForm />
      </Card>
    </div>
  )
}
