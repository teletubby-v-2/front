import React from 'react'
import { UserStep } from '../../components'
import successDog from '../../assets/icons/success_dog.svg'
import { Button } from 'antd'
import { useHistory } from 'react-router'
export const Success: React.FC = () => {
  const history = useHistory()
  return (
    <div className="flex justify-center space-x-2 my-10">
      <UserStep current={4} />
      <div style={{ width: 700 }}>
        <div className="p-5 mx-auto bg-white space-y-5 shadow-1 w-80">
          <div className="h-60">
            <img src={successDog} alt="" className="mx-auto" />
          </div>
          <Button block onClick={() => history.push('/home')}>
            เริ่มต้นใช้งาน
          </Button>
        </div>
      </div>
    </div>
  )
}
