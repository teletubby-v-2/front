import { Avatar, Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthZone } from '..'
import { followUser, unFollowUser } from '../../service/user/follow'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'
import { FollowCardSkeleton } from '../MySkeleton/FollowCardSkeleton'

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
      .then(() => removeFollowing(userId))
      .catch(err => console.log(err))
  }

  return (
    <Card hoverable bordered className={`${className}  bg-white w-52 h-64 relative`}>
      <FollowCardSkeleton loading={loading}>
        <div
          className="flex flex-col justify-end w-full h-full space-y-2"
          onClick={() => history.push('/profile/' + userId)}
        >
          <div className="flex justify-center h-14">
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              className="text-lg text-center overflow-hidden  "
            >
              {userName}
            </Typography.Paragraph>
          </div>
          <div className="flex justify-center">
            <Avatar src={imageUrl} size={100} alt="Profile picture" className="object-cover" />
          </div>
          <div className="h-10" />
        </div>
        <div className="absolute bottom-0 w-full p-5 right-0">
          <AuthZone className="z-10">
            {!(userId == userInfo.userId) &&
              (userInfo.following.includes(userId) ? (
                <Button block onClick={onUnfollow}>
                  เลิกติดตาม
                </Button>
              ) : (
                <Button type="primary" block onClick={onFollow}>
                  ติดตาม
                </Button>
              ))}
          </AuthZone>
        </div>
      </FollowCardSkeleton>
    </Card>
  )
}
