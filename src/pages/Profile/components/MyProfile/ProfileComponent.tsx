import React from 'react'
import { Button, Divider } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'

export interface ProfileComponentProps {
  onEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const ProfileComponent: React.FC<ProfileComponentProps> = props => {
  const { onEdit } = props
  const { userInfo } = userInfoStore()

  return (
    <div className="mx-10 my-10">
      <h1 className="text-center text-2xl font-black ">{userInfo.userName}</h1>
      <img src={userInfo.imageUrl} className="my-8 mx-auto" width="200" />
      <div className="text-center space-x-4">
        <Button className="w-48" onClick={onEdit}>
          Edit
        </Button>
        <Button>
          <DashOutlined />
        </Button>
      </div>
      <Divider>
        <p className="text-gray-400">General</p>
      </Divider>
      <ul className="list-none">
        <li>
          <p>Email : {userInfo.email} </p>
        </li>
        <li>
          <p>About me: </p>
          <p className="text-left break-words"></p>
        </li>
        <p></p>
      </ul>
      <Divider>
        <p className="text-gray-400">Social Link</p>
      </Divider>
      <ul className="list-none">
        <li>
          <p>Instagram: </p>
          <a href=""></a>
        </li>
        <li>
          <p>Facebook: </p>
          <a href=""></a>
        </li>
        <li>
          <p>Youtube:</p>
          <a href=""></a>
        </li>
      </ul>
    </div>
  )
}
