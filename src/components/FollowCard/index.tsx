import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { AuthZone } from '..'
import { followUser, unFollowUser } from '../../service/user/follow'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'
import { strInnerParagraph } from '../../utils/strInnerParagraph'
import { FollowCardSkeleton } from '../MySkeleton/FollowCardSkeleton'

export interface FollowCardProps {
  userId: string
  className?: string
}

export const FollowCard: React.FC<FollowCardProps> = ({ userId, className }) => {
  const [userName, setuserName] = useState(String)
  const [imageUrl, setimageUrl] = useState(String)
  const [loading, setloading] = useState(true)
  const { userInfo, removeFollowing, addFollowing } = userInfoStore()

  useEffect(() => {
    setloading(true)
    fetchUser(userId)
      .then(info => {
        setuserName(info.username)
        setimageUrl(info.photoURL)
      })
      .catch(err => console.log(err))
      .finally(() => setloading(false))
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
        <Link
          className="flex flex-col justify-end w-full h-full space-y-2"
          to={`/profile/${userId}`}
        >
          <div className="flex justify-center h-14">
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              className="text-lg text-center overflow-hidden"
            >
              {strInnerParagraph(userName)}
            </Typography.Paragraph>
          </div>
          <div className="flex justify-center">
            <LazyLoadImage
              src={imageUrl}
              height={100}
              width={100}
              alt="Profile picture"
              className="object-cover rounded-full"
              effect="blur"
            />
          </div>
          <div className="h-10" />
        </Link>
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
