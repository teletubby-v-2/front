import React from 'react'
import { Button, Divider } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'

export interface ProfileComponentProps {
  onEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const QRComponent: React.FC<ProfileComponentProps> = props => {
  const { onEdit } = props
  const { userInfo } = userInfoStore()
  const imageUrl = ''

  return (
    <div className="p-3">
      <Divider>
        <p className="text-xl">Donate Preview</p>
      </Divider>
      {imageUrl ? (
        <img src={imageUrl} alt="QR" />
      ) : (
        <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
          Upload your QR Code
        </div>
      )}
      <p>testing para aaaaaa adawgawgas gasdaqw</p>
      <div className="text-center">
        <Button className="w-1/2 mx-auto" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  )
}
