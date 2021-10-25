import { Steps } from 'antd'
import React from 'react'

export interface UserStepProps {
  current: number
}

const { Step } = Steps

export const UserStep: React.FC<UserStepProps> = props => {
  return (
    <div>
      <Steps direction="vertical" current={props.current}>
        <Step title="สมัครสมาชิก" />
        <Step title="ยืนยันอีเมล" />
        <Step title="กรอกข้อมูลของฉัน" />
        <Step title="เลือกวิชาของฉัน" />
        <Step title="เสร็จสิ้น" />
      </Steps>
    </div>
  )
}
