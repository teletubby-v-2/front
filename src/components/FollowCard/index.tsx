import { Avatar, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthZone } from '..'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'

export interface FollowCardProps {
  userId: string
  className?: string
}

export const FollowCard: React.FC<FollowCardProps> = ({ userId, className }) => {
  const [userName, setuserName] = useState(String)
  const [imageUrl, setimageUrl] = useState(String)
  const { userInfo } = userInfoStore()
  const history = useHistory()
  useEffect(() => {
    fetchUser(userId).then(info => {
      setuserName(info.username)
      setimageUrl(info.photoURL)
    })
  }, [])

  return (
    <div
      className={`${className} ant-card-grid-hoverable border-2 border-gray-500 w-52 h-60 p-2 `}
      onClick={() => history.push('/profile/' + userId)}
    >
      {/* todo: no border???? why!!!! */}
      <div className="flex flex-col justify-between w-full h-full ">
        <div className="text-2xl text-center overflow-hidden">{userName}</div>
        <div className="flex justify-center">
          <Avatar src={imageUrl} size={100} alt="Profile picture" className="object-cover" />
        </div>

        <AuthZone className="">
          {userInfo.following.includes(userId) ? (
            <Button block>เลิกติดตาม</Button>
          ) : (
            <Button type="primary" block>
              ติดตาม
            </Button>
          )}
        </AuthZone>
      </div>
    </div>
  )
}
