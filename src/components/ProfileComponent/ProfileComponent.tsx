import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider } from 'antd'
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_user from '../../assets/images/no_user.png'
import { userInfoStore } from '../../store/user.store'
import { AuthZone } from '..'
import { followUser, unFollowUser } from '../../service/user/follow'
import { Link } from 'react-router-dom'

export interface ProfileComponentProps {
  onEdit?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isMy: boolean
  info: MyUser
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, info }) => {
  const { userInfo, removeFollowing, addFollowing } = userInfoStore()
  const [followCount, setFollowCount] = useState(0)
  const [isFollow, setIsFollow] = useState(false)

  useEffect(() => {
    setIsFollow(userInfo.following.includes(info.userId))
    setFollowCount(info.followers?.length)
  }, [info, userInfo.following])

  const onFollow = () => {
    followUser(info.userId)
      .then(() => {
        addFollowing(info.userId)
        setIsFollow(true)
        setFollowCount(followCount + 1)
      })
      .catch(err => console.log(err))
  }

  const onUnfollow = () => {
    unFollowUser(info.userId)
      .then(() => {
        setIsFollow(false)
        removeFollowing(info.userId)
        setFollowCount(followCount - 1)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="text-center my-3">
        <h1 className="text-center text-2xl font-black ">{info.userName}</h1>
      </div>
      <div className="flex w-full justify-center">
        <Avatar
          src={info.imageUrl || no_user}
          size={200}
          alt="Profile picture"
          className=" object-cover"
        />
      </div>
      <div className="text-center items-center mt-3 mb-2">
        <p>
          <Link className="ml-3" to={`/follow/${info.userId}/followers`}>
            {followCount} ???????????????????????????{' '}
          </Link>
          <Link className="ml-3 text-blue-600" to={`/follow/${info.userId}/following`}>
            {info?.following?.length} ?????????????????????????????????
          </Link>
        </p>
      </div>
      <div className="text-center space-x-4 flex">
        {isMy ? (
          <Button className="flex-grow" onClick={onEdit}>
            ???????????????
          </Button>
        ) : (
          <AuthZone className="flex-grow">
            {isFollow ? (
              <Button onClick={onUnfollow} block>
                ??????????????????????????????
              </Button>
            ) : (
              <Button type="primary" onClick={onFollow} block>
                ??????????????????
              </Button>
            )}
          </AuthZone>
        )}
      </div>
      <Divider>
        <p className="text-gray-400 mb-0">????????????????????????????????????</p>
      </Divider>
      <ul className="list-none space-y-2 pl-0 space-y-4">
        <div className="text-center text-3xl">
          {isMy ? (
            <>
              {userInfo.socialLink.instagram && userInfo.socialLink.instagram?.length !== 0 && (
                <a
                  href={userInfo.socialLink.instagram}
                  className="overflow-hidden text-gray-500 px-3 "
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-gradient  bg-gradient-to-r from-purple-400 to-pink-600">
                    <InstagramOutlined />
                  </span>
                </a>
              )}
              {userInfo.socialLink.facebook && userInfo.socialLink.facebook?.length !== 0 && (
                <a
                  href={userInfo.socialLink.facebook}
                  className=" overflow-hidden text-gray-500 px-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookOutlined />
                </a>
              )}
              {userInfo.socialLink.youtube && userInfo.socialLink.youtube?.length !== 0 && (
                <a
                  href={userInfo.socialLink.youtube}
                  className="overflow-hidden text-gray-500 px-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <YoutubeOutlined />
                </a>
              )}
            </>
          ) : (
            <>
              {info.socialLink.instagram && info.socialLink.instagram?.length !== 0 && (
                <a
                  href={info.socialLink.instagram}
                  className="overflow-hidden text-gray-500 px-3 "
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-gradient  bg-gradient-to-r from-purple-400 to-pink-600">
                    <InstagramOutlined />
                  </span>
                </a>
              )}
              {info.socialLink.facebook && info.socialLink.facebook?.length !== 0 && (
                <a
                  href={info.socialLink.facebook}
                  className=" overflow-hidden text-gray-500 px-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookOutlined />
                </a>
              )}
              {info.socialLink.youtube && info.socialLink.youtube?.length !== 0 && (
                <a
                  href={userInfo.socialLink.youtube}
                  className="overflow-hidden text-gray-500 px-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <YoutubeOutlined />
                </a>
              )}
            </>
          )}
        </div>
        {info?.aboutMe?.length !== 0 && (
          <li>
            <p className="text-gray-500 mb-1">????????????????????????????????????: </p>
            <p className="text-left break-words">{info.aboutMe}</p>
          </li>
        )}
      </ul>
    </>
  )
}
