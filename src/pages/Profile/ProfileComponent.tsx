import { Avatar, Button, Divider, Space, Image } from 'antd'
import React from 'react'
import { DashOutlined } from '@ant-design/icons'

export default function ProfileComponent({ onEdit }: any) {
  return (
    <div className="w-96 content-center justify-center bg-gray-200 flex-initial px-8 py-6 border-4 rounded">
      <h1 className="text-center text-2xl">Placeholder</h1>
      <Image />
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
          <p>Email</p>
          <a href=""></a>
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
