import React from 'react'
import { useHistory } from 'react-router-dom'
import { userInfoStore } from '../../store/user.store'
import { DiffOutlined, TeamOutlined } from '@ant-design/icons'
import { Avatar, Menu, Typography } from 'antd'

export interface NotiMenuItemprop {
  notiId: string
  type: string
  body: string
  link: string
}

export const NotiMenuItem: React.FC<NotiMenuItemprop> = ({ notiId, type, body, link }) => {
  const history = useHistory()
  const { userInfo, addnotificationReadCount } = userInfoStore()
  let icon
  let className
  if (type == 'follow') {
    icon = <TeamOutlined className="align-middle" />
  } else if (type == 'lecture') {
    icon = <DiffOutlined className="align-middle" />
  }

  if (userInfo.notificationReadCount.includes(notiId ? notiId : '')) {
    className = 'bg-gray-200'
  } else {
    className = 'bg-white'
  }

  return (
    <Menu.Item
      className={`${className} p-2 space-x-2`}
      key={notiId}
      onClick={() => {
        addnotificationReadCount(notiId)
        history.push(link)
      }}
    >
      <div className="flex items-center">
        <Avatar icon={icon} className="bg-blue-200 mr-3" />
        <div>
          <Typography.Text ellipsis className="w-40">
            {body}
          </Typography.Text>
        </div>
      </div>
    </Menu.Item>
  )
}
