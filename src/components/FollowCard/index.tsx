import { Avatar, Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthZone } from '..'
import { followUser, unFollowUser } from '../../service/user/follow'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'
import { LoadingOutlined } from '@ant-design/icons'

export interface FollowCardProps {
  userId: string
  className?: string
}

export const FollowCard: React.FC<FollowCardProps> = ({ userId, className }) => {
  const [userName, setuserName] = useState(String)
  const [imageUrl, setimageUrl] = useState(String)
  const [loading, setloading] = useState(true)
  const history = useHistory()
  const { userInfo, removeFollowing, addFollowing } = userInfoStore()

  useEffect(() => {
    setloading(true)
    fetchUser(userId)
      .then(info => {
        setuserName(info.username)
        setimageUrl(info.photoURL)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setloading(false)
      })
  }, [])

  const onFollow = () => {
    followUser(userId)
      .then(() => {
        addFollowing(userId)
      })
      .catch(err => console.log(err))
  }

  const onUnfollow = () => {
    unFollowUser(userId)
      .then(() => {
        removeFollowing(userId)
      })
      .catch(err => console.log(err))
  }

  const isMe = userId == userInfo.userId

  const antIconLoading = <LoadingOutlined style={{ fontSize: 96 }} spin />

  return (
    <div className={`${className} ant-card-grid-hoverable border-2 border-gray-500 w-52 h-60 p-2 `}>
      {/* todo: no border???? why!!!! */}
      {!loading ? (
        <div className="flex flex-col justify-between w-full h-full ">
          <div className="text-2xl text-center overflow-hidden">{userName}</div>
          <div className="flex justify-center" onClick={() => history.push('/profile/' + userId)}>
            <Avatar src={imageUrl} size={100} alt="Profile picture" className="object-cover" />
          </div>

          <AuthZone className="">
            {!isMe ? (
              userInfo.following.includes(userId) ? (
                <Button block onClick={onUnfollow}>
                  เลิกติดตาม
                </Button>
              ) : (
                <Button type="primary" block onClick={onFollow}>
                  ติดตาม
                </Button>
              )
            ) : (
              <div />
            )}
          </AuthZone>
        </div>
      ) : (
        <div className="text-center mt-14">
          <Spin indicator={antIconLoading} />
        </div>
      )}
    </div>
  )
}
