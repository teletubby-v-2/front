import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider } from 'antd'
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_user from '../../assets/images/no_user.png'
import { userInfoStore } from '../../store/user.store'
import { AuthZone } from '..'
import { useHistory } from 'react-router'
import { followUser, unFollowUser } from '../../service/user/follow'

export interface ProfileComponentProps {
  onEdit?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isMy: boolean
  info: MyUser
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, info: Info }) => {
  const history = useHistory()
  const { userInfo, removeFollowing, addFollowing } = userInfoStore()
  const [followCount, setFollowCount] = useState(0)
  const [isFollow, setIsFollow] = useState(false)

  useEffect(() => {
    setIsFollow(userInfo.following.includes(Info.userId))
    setFollowCount(Info.followers?.length)
  }, [Info, userInfo.following])

  const onFollow = () => {
    followUser(Info.userId)
      .then(() => {
        addFollowing(Info.userId)
        setIsFollow(true)
        setFollowCount(followCount + 1)
      })
      .catch(err => console.log(err))
  }

  const onUnfollow = () => {
    unFollowUser(Info.userId)
      .then(() => {
        setIsFollow(false)
        removeFollowing(Info.userId)
        setFollowCount(followCount - 1)
      })
      .catch(err => console.log(err))
  }

  const tofollowing = () => {
    history.push('/follow/' + Info.userId + '/following')
  }

  const tofollowers = () => {
    history.push('/follow/' + Info.userId + '/followers')
  }

  return (
    <div className="p-6  bg-white">
      <div className="text-center my-3">
        <h1 className="text-center text-2xl font-black ">{Info.userName}</h1>
      </div>
      <div className="flex w-full justify-center">
        <Avatar
          src={Info.imageUrl || no_user}
          size={200}
          alt="Profile picture"
          className=" object-cover"
        />
      </div>
      <div className="text-center items-center mt-3 mb-2">
        <p>
          <a className="ml-3 text-blue-600" onClick={tofollowers}>
            {followCount} ผู้ติดตาม{' '}
          </a>
          <a className="ml-3 text-blue-600" onClick={tofollowing}>
            {Info?.following?.length} กำลังติดตาม
          </a>
        </p>
      </div>
      <div className="text-center space-x-4 flex">
        {isMy ? (
          <Button className="flex-grow" onClick={onEdit}>
            แก้ไข
          </Button>
        ) : (
          <AuthZone className="flex-grow">
            {isFollow ? (
              <Button onClick={onUnfollow} block>
                เลิกติดตาม
              </Button>
            ) : (
              <Button type="primary" onClick={onFollow} block>
                ติดตาม
              </Button>
            )}
          </AuthZone>
        )}
      </div>
      <Divider>
        <p className="text-gray-400 mb-0">ลิงก์โซเชียล</p>
      </Divider>
      <ul className="list-none space-y-2 pl-0 space-y-4">
        <div className="text-center text-3xl">
          {userInfo.socialLink.instagram?.length !== 0 && (
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
          {userInfo.socialLink.facebook?.length !== 0 && (
            <a
              href={userInfo.socialLink.facebook}
              className=" overflow-hidden text-gray-500 px-3"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookOutlined />
            </a>
          )}
          {userInfo.socialLink.youtube?.length !== 0 && (
            <a
              href={userInfo.socialLink.youtube}
              className="overflow-hidden text-gray-500 px-3"
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeOutlined />
            </a>
          )}
        </div>
        {Info?.aboutMe?.length !== 0 && (
          <li>
            <p className="text-gray-500 mb-1">เกี่ยวกับฉัน : </p>
            <p className="text-left break-words">{Info.aboutMe}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
