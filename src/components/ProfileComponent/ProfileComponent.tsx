import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider } from 'antd'
import {
  DashOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_user from '../../assets/images/no_user.png'
import { userInfoStore } from '../../store/user.store'
import { UpdateUserDTO } from '../../constants/dto/myUser.dto'
import { updateUser } from '../../service/user'

export interface ProfileComponentProps {
  onEdit?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isMy: boolean
  Info: MyUser
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')

  const { userInfo, setFollowing } = userInfoStore()

  useEffect(() => {
    userInfo.socialLink.forEach(social => {
      if (social.socialMediaName == 'youtube') {
        setYoutube(social.socialMedisUrl)
      }
      if (social.socialMediaName == 'instagram') {
        setInstagram(social.socialMedisUrl)
      }
      if (social.socialMediaName == 'facebook') {
        setFacebook(social.socialMedisUrl)
      }
    })
  }, [userInfo.socialLink])

  const onFollow = () => {
    const newfollowing = userInfo.following
    newfollowing.push(Info.userId)
    updateUser({ following: newfollowing } as UpdateUserDTO)
      .then(() => {
        setFollowing(newfollowing)
      })
      .catch(err => console.log(err))
  }

  const onUnfollow = () => {
    const newfollowing = userInfo.following.filter(function (value, index, arr) {
      return value != Info.userId
    })
    updateUser({ following: newfollowing } as UpdateUserDTO)
      .then(() => {
        setFollowing(newfollowing)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="p-6">
      <div className="text-center my-3">
        <h1 className="text-center text-2xl font-black ">{Info.userName}</h1>
      </div>
      <div className="flex w-full justify-center">
        {Info.imageUrl ? (
          <Avatar src={Info.imageUrl} size={200} alt="Profile picture" className=" object-cover" />
        ) : (
          <Avatar src={no_user} alt="no_user" size={200} className="mx-auto flex object-cover" />
        )}
      </div>
      <div className="text-center items-center mt-3 mb-2">
        <p>
          {Info?.followers?.length} ผู้ติดตาม{' '}
          <a className="ml-3 text-blue-600">{Info?.following?.length} กำลังติดตาม</a>
        </p>
      </div>
      <div className="text-center space-x-4 flex">
        {isMy ? (
          <>
            <Button className="flex-grow" onClick={onEdit}>
              แก้ไข
            </Button>
            <Button>
              <DashOutlined />
            </Button>
          </>
        ) : (
          <>
            {userInfo.following.includes(Info.userId) ? (
              <Button className="flex-grow" onClick={onUnfollow}>
                เลิกติดตาม
              </Button>
            ) : (
              <Button className="flex-grow" type="primary" onClick={onFollow}>
                ติดตาม
              </Button>
            )}
          </>
        )}
      </div>
      <Divider>
        <p className="text-gray-400 mb-0">Social Link</p>
      </Divider>
      <ul className="list-none space-y-2 pl-0">
        {instagram.length !== 0 && (
          <li>
            <p>
              <InstagramOutlined className="text-2xl mr-3" /> Instagram:
              <a href={instagram} className="ml-2">
                {instagram}
              </a>
            </p>
          </li>
        )}
        {facebook.length !== 0 && (
          <li>
            <p>
              <FacebookOutlined className="text-2xl mr-3" /> Facebook:
              <a href={facebook} className="ml-2">
                {facebook}
              </a>
            </p>
          </li>
        )}
        {youtube.length !== 0 && (
          <li>
            <p>
              <YoutubeOutlined className="text-2xl mr-3" /> Youtube:
              <a href={youtube} className="ml-2">
                {youtube}
              </a>
            </p>
          </li>
        )}
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
