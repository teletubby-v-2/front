import React from 'react'
import { Button, Divider } from 'antd'
import {
  DashOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { MyUser } from '../../constants/interface/myUser.interface'

export interface ProfileComponentProps {
  onEdit?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isMy: boolean
  Info: MyUser
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  return (
    <div className="p-3">
      <Divider>
        <h1 className="text-center text-2xl font-black ">{Info.userName}</h1>
      </Divider>

      {Info.imageUrl ? (
        <img src={Info.imageUrl} alt="Profile picture" className="my-8 mx-auto" width="200" />
      ) : (
        <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
          No Picture
        </div>
      )}

      <div className="text-center space-x-4">
        {isMy ? (
          <Button className="w-1/2" onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <Button className="w-1/2 bg-blue-500">Follow</Button>
        )}

        <Button>
          <DashOutlined />
        </Button>
      </div>

      <div className="text-center items-center my-5">
        <p>
          {Info.follower.length} Follower {Info.following.length} Following
        </p>
      </div>

      <Divider>
        <p className="text-gray-400">Social Link</p>
      </Divider>
      <ul className="list-none">
        <li>
          <p>
            <InstagramOutlined className="text-2xl mr-3" /> Instagram: <a href=""></a>
          </p>
        </li>
        <li>
          <p>
            <FacebookOutlined className="text-2xl mr-3" /> Facebook: <a href=""></a>
          </p>
        </li>
        <li>
          <p>
            <YoutubeOutlined className="text-2xl mr-3" /> Youtube: <a href=""></a>
          </p>
        </li>
      </ul>

      <Divider>
        <p className="text-gray-400">General</p>
      </Divider>
      <ul className="list-none">
        <li>
          <p>Email : {Info.email} </p>
        </li>
        <li>
          <p>About me: </p>
          <p className="text-left break-words"></p>
        </li>
        <p></p>
      </ul>
    </div>
  )
}
