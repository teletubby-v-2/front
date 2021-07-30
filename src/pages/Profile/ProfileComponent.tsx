import { Avatar, Button, Divider, Space, Image } from 'antd'
import React from 'react'
import { DashOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'

export function ProfileComponent({ onEdit }: any) {
  const { email, displayName, photoURL } = userInfoStore()

  return (
    <div className="mx-10 my-10">
      <h1 className="text-center text-2xl">{displayName}</h1>
      <Image src={photoURL} />
      <div className="text-center space-x-4">
        <Button className="w-48" onClick={onEdit}>
          Edit
        </Button>
        <Button>
          <DashOutlined />
        </Button>
      </div>
      <Divider>General</Divider>
      <ul className="list-none">
        <li>
          <p>Email : {email} </p>
        </li>
        <li>
          <p>About me: </p>
        </li>
        <p></p>
      </ul>
      <Divider>Social Link</Divider>
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
