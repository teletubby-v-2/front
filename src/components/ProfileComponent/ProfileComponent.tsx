import React, { useEffect, useState } from 'react'
import { Button, Divider } from 'antd'
import {
  DashOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_user from '../../assets/images/no_user.png'

export interface ProfileComponentProps {
  onEdit?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isMy: boolean
  Info: MyUser
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  const [Facebook, setFacebook] = useState('')
  const [Instagram, setInstagram] = useState('')
  const [Youtube, setYoutube] = useState('')

  useEffect(() => {
    Info.socialLink.forEach(i => {
      if (i.socialMediaName == 'youtube') {
        setYoutube(i.socialMedisUrl)
      }
      if (i.socialMediaName == 'instagram') {
        setInstagram(i.socialMedisUrl)
      }
      if (i.socialMediaName == 'facebook') {
        setFacebook(i.socialMedisUrl)
      }
    })
  }, [Info])

  return (
    <div className="p-3">
      <Divider>
        <h1 className="text-center text-2xl font-black ">{Info.userName}</h1>
      </Divider>
      {Info.imageUrl ? (
        <img src={Info.imageUrl} alt="Profile picture" className="my-8 mx-auto flex" width="200" />
      ) : (
        <img src={no_user} alt="no_user" className="my-8 mx-auto flex" width="200" />
      )}
      <div className="text-center space-x-4">
        {isMy ? (
          <Button className="w-1/2" onClick={onEdit}>
            แก้ไข
          </Button>
        ) : (
          <Button className="w-1/2 bg-blue-500">ติดตาม</Button>
        )}

        <Button>
          <DashOutlined />
        </Button>
      </div>

      <div className="text-center items-center my-5">
        <p>
          {Info?.followers?.length} ผู้ติดตาม{' '}
          <a className="ml-3 text-blue-600">{Info?.following?.length} กำลังติดตาม</a>
        </p>
      </div>
      <Divider>
        <p className="text-gray-400">Social Link</p>
      </Divider>
      <ul className="list-none">
        <li>
          <p>
            <InstagramOutlined className="text-2xl mr-3" /> Instagram:
            <a href={Instagram} className="ml-2">
              {Instagram}
            </a>
          </p>
        </li>
        <li>
          <p>
            <FacebookOutlined className="text-2xl mr-3" /> Facebook:
            <a href={Facebook} className="ml-2">
              {Facebook}
            </a>
          </p>
        </li>
        <li>
          <p>
            <YoutubeOutlined className="text-2xl mr-3" /> Youtube:
            <a href={Youtube} className="ml-2">
              {Youtube}
            </a>
          </p>
        </li>
      </ul>
      <Divider />
      <p>เกี่ยวกับฉัน : </p>
      <p className="text-left break-words">{Info.aboutMe}</p>
    </div>
  )
}
