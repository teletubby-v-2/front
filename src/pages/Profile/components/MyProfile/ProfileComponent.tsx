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
    <div className="p-3">
      <Divider>
        <h1 className="text-center text-2xl font-black ">{userInfo.userName}</h1>
      </Divider>
      {userInfo.imageUrl ? (
        <img src={userInfo.imageUrl} alt="Profile picture" className="my-8 mx-auto" width="200" />
      ) : (
        <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
          No Picture
        </div>
      )}
      <div className="text-center space-x-4">
        <Button className="w-1/2" onClick={onEdit}>
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
          <p>
            Instagram: <a href=""></a>
          </p>
        </li>
        <li>
          <p>
            Facebook: <a href=""></a>
          </p>
        </li>
        <li>
          <p>
            Youtube: <a href=""></a>
          </p>
        </li>
      </ul>
    </div>
  )
}
