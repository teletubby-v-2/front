import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { userInfoStore } from '../../store/user.store'
import { DiffOutlined, TeamOutlined } from '@ant-design/icons'
import { Avatar, Badge, Divider } from 'antd'
import { addnotification } from '../../service/user'

export interface NotiMenuItemprop {
  notiId: string
  type: string
  body: string
  link: string
}

export const NotiMenuItem: React.FC<NotiMenuItemprop> = ({ notiId, type, body, link }) => {
  const { userInfo, addNotificationReadCount } = userInfoStore()
  const [bodys] = useState(body.split(' '))

  const icon = useMemo(() => {
    if (type == 'follow') {
      return <TeamOutlined />
    } else if (type == 'lecture') {
      return <DiffOutlined />
    }
  }, [type])
  const AvatarIcon = useMemo(() => {
    if (userInfo.notificationReadCount.includes(notiId ? notiId : '')) {
      return <Avatar icon={icon} className="bg-blue-200 mr-3" />
    } else {
      return (
        <Badge dot>
          <Avatar icon={icon} className="bg-blue-200 mr-3" />
        </Badge>
      )
    }
  }, [userInfo.notificationReadCount])

  return (
    <>
      <div
        className={`${
          !userInfo.notificationReadCount.includes(notiId ? notiId : '')
            ? 'bg-white'
            : 'bg-gray-100'
        } p-2 space-x-2 cursor-pointer`}
        key={notiId}
      >
        <Link
          to={link}
          onClick={() => {
            if (!userInfo.notificationReadCount.includes(notiId ? notiId : '')) {
              addnotification(notiId).then(() => addNotificationReadCount(notiId))
            }
          }}
        >
          <div className="flex items-center text-gray-800">
            <div>{AvatarIcon}</div>
            <div>
              {bodys.slice(0, bodys.length - 1).join(' ')}
              <br />
              {bodys[bodys.length - 1]}
            </div>
          </div>
        </Link>
      </div>
      <Divider className="my-0" />
    </>
  )
}
