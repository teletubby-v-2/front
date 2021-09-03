import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Upload, Input, message } from 'antd'
import {
  UploadOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { updateUser } from '../../service/user'
import { UpdateUserDTO } from '../../constants/dto/myUser.dto'
import { SocialLink } from '../../constants/interface/myUser.interface'
import { deleteImages } from '../../service/storage'
import { removeUndefined } from '../../utils/object'
import { firebaseApp } from '../../config/firebase'

export interface UpdateValue {
  aboutme: string
  instagram: string
  twitter: string
  youtube: string
}

export interface EditComponentProps {
  onClose: () => void
}

export const EditComponent: React.FC<EditComponentProps> = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo, setImageURL, setSocialLink, setAboutme } = userInfoStore()
  const { TextArea } = Input
  const { onClose } = props
  const [imageUrl, setimageUrl] = useState(userInfo.imageUrl)
  const { handleRequest, beforeUpload } = useUploadpic({
    setimageUrl,
    setIsUploading,
    imageUrl,
    originalimageUrl: userInfo.imageUrl,
  })

  const [Facebook, setFacebook] = useState('')
  const [Instagram, setInstagram] = useState('')
  const [Youtube, setYoutube] = useState('')

  useEffect(() => {
    userInfo.socialLink.forEach(i => {
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
  }, [userInfo])

  const Info = {
    aboutme: userInfo.aboutme,
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
  }

  const onFinish = (value: UpdateValue) => {
    console.log(value)
    console.log(imageUrl)
    console.log(userInfo)

    const socialLink: SocialLink[] = [
      {
        socialMediaName: 'instagram',
        socialMedisUrl: value.instagram ? 'https://' + value.instagram : '',
      },
      {
        socialMediaName: 'youtube',
        socialMedisUrl: value.youtube ? 'https://' + value.youtube : '',
      },
      {
        socialMediaName: 'twitter',
        socialMedisUrl: value.twitter ? 'https://' + value.twitter : '',
      },
    ]
    if (
      imageUrl != userInfo.imageUrl ||
      value.aboutme != userInfo.aboutme ||
      socialLink != userInfo.socialLink
    ) {
      const data: UpdateUserDTO = {
        socialLink: socialLink,
        imageUrl: imageUrl,
        aboutMe: value.aboutme,
      }
      const user = firebaseApp.auth().currentUser
      try {
        user?.updateProfile({
          photoURL: imageUrl,
        })
        updateUser(data)
        if (imageUrl != userInfo.imageUrl && userInfo.imageUrl) {
          deleteImages(userInfo.imageUrl)
        }
        imageUrl ? setImageURL(imageUrl) : null
        setSocialLink(socialLink)
        setAboutme(value.aboutme)
      } catch (err) {
        console.log(err)
      }
    }
    onClose()
  }

  return (
    <div className="p-3">
      <Divider>
        <h1 className="text-center text-2xl font-black">Edit Profile</h1>
      </Divider>
      {!isUploading ? (
        imageUrl ? (
          <img src={imageUrl} alt="Profile picture" className="my-8 mx-auto flex" width="200" />
        ) : (
          <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
            No Picture
          </div>
        )
      ) : (
        <div className="text-center my-10">
          <LoadingOutlined />
        </div>
      )}

      <Form onFinish={onFinish} initialValues={Info}>
        <div className="text-center">
          <Form.Item
            name="imagefile"
            help={
              <>
                <InfoCircleOutlined className="tag-icon" />
                {'  '}แนะนำให้เป็นรูปขนาดเล็กกว่า 2MB
              </>
            }
          >
            <Upload
              accept="image/*"
              maxCount={1}
              disabled={isUploading}
              customRequest={handleRequest}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              {' '}
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <Divider>
          <p className="text-gray-400">General</p>
        </Divider>
        <Form.Item>
          <Input placeholder={userInfo.userName} disabled={true} />
        </Form.Item>
        <Form.Item>
          <Input placeholder={userInfo.email} disabled={true} />
        </Form.Item>
        <Form.Item name="aboutme">
          <TextArea
            showCount
            maxLength={300}
            placeholder="about me"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Divider>
          <p className="text-gray-400">Social Link</p>
        </Divider>
        <Form.Item name="instagram">
          <Input
            addonBefore="https://"
            defaultValue="mysite.com"
            placeholder="Instagram"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Form.Item name="facebook">
          <Input
            addonBefore="https://"
            defaultValue="mysite.com"
            placeholder="Facebook"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Form.Item name="youtube">
          <div className="content-center">
            <Input
              addonBefore="https://"
              defaultValue=""
              placeholder="Youtube"
              onKeyDown={dontSubmitWhenEnter}
            />
          </div>
        </Form.Item>
        <Form.Item className="m-3 text-center">
          <Button type="primary" htmlType="submit" size="large" className="mx-4">
            Save
          </Button>
          <Button type="primary" size="large" onClick={onClose} className="mx-4">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
