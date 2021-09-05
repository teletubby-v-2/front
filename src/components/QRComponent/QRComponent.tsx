import React from 'react'
import { Button, Divider } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_image from '../../assets/images/no_image.jpg'

export interface ProfileComponentProps {
  onEdit?: () => void
  isMy: boolean
  Info: MyUser
}

export const QRComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  return (
    <div className="p-3">
      <Divider>
        <p className="text-xl"> ช่องทางสนับสนุน </p>
      </Divider>
      {Info.donateImage ? (
        <img src={Info.donateImage} alt="QR" width="200" />
      ) : (
        <img src={no_image} alt="noimage" width="200" className="mx-auto flex my-3" />
      )}
      {Info.donateDescription ? (
        <p className="text-center">{Info.donateDescription}</p>
      ) : (
        <p className="text-center">เจ้าของสรุปยังไม่ได้ใส่ช่องทางในการสนับสนุน </p>
      )}

      {isMy ? (
        <div className="text-center">
          <Button className="w-1/2 mx-auto mt-5" onClick={onEdit}>
            แก้ไข
          </Button>
        </div>
      ) : null}
    </div>
  )
}
