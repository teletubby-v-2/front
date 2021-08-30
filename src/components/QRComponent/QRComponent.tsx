import React from 'react'
import { Button, Divider } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { MyUser } from '../../constants/interface/myUser.interface'

export interface ProfileComponentProps {
  onEdit?: () => void
  isMy: boolean
  Info: MyUser
}

export const QRComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  return (
    <div className="p-3">
      <Divider>
        <p className="text-xl">Donate Preview</p>
      </Divider>
      {Info.donateImage ? (
        <img src={Info.donateImage} alt="QR" />
      ) : (
        <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
          Upload your QR Code
        </div>
      )}
      <p>{Info.donateDescription}</p>
      {isMy ? (
        <div className="text-center">
          <Button className="w-1/2 mx-auto" onClick={onEdit}>
            Edit
          </Button>
        </div>
      ) : null}
    </div>
  )
}
