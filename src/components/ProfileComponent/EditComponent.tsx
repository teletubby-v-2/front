import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input, Avatar, Popconfirm } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { updateUser } from '../../service/user'
import { UpdateUserDTO } from '../../constants/dto/myUser.dto'
import { SocialLink } from '../../constants/interface/myUser.interface'
import { deleteImages } from '../../service/storage'
import { firebaseApp } from '../../config/firebase'
import { useForm } from 'antd/lib/form/Form'
import no_user from '../../assets/images/no_user.png'

export interface UpdateValue {
  aboutMe: string
  socialLink: {
    instagram: string
    facebook: string
    youtube: string
  }
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
  const [form] = useForm<UpdateValue>()
  const { handleRequest, beforeUpload } = useUploadpic({
    setimageUrl,
    setIsUploading,
    imageUrl,
    originalimageUrl: userInfo.imageUrl,
  })
  const [loading, setLoading] = useState(false)

  const onFinish = (value: UpdateValue) => {
    setLoading(true)
    const { socialLink } = value
    const socialLinkMap: SocialLink = {
      instagram: socialLink.instagram
        ? 'https://' + socialLink.instagram.replace('https://', '')
        : '',
      facebook: socialLink.facebook ? 'https://' + socialLink.facebook.replace('https://', '') : '',
      youtube: socialLink.youtube ? 'https://' + socialLink.youtube.replace('https://', '') : '',
    }
    if (
      imageUrl != userInfo.imageUrl ||
      value.aboutMe != userInfo.aboutMe ||
      socialLinkMap != userInfo.socialLink
    ) {
      const data: UpdateUserDTO = {
        socialLink: socialLinkMap,
        imageUrl: imageUrl,
        aboutMe: value.aboutMe,
      }
      const user = firebaseApp.auth().currentUser
      user
        ?.updateProfile({
          photoURL: imageUrl,
        })
        .then(() => updateUser(data))
        .then(() => {
          if (imageUrl != userInfo.imageUrl && userInfo.imageUrl) {
            deleteImages(userInfo.imageUrl)
          }
          imageUrl ? setImageURL(imageUrl) : null
          setSocialLink(socialLinkMap)
          setAboutme(value.aboutMe)
        })
        .catch(err => console.log(err))
        .finally(() => {
          onClose()
          setLoading(false)
        })
    }
  }

  const beforeClose = () => {
    if (imageUrl != userInfo.imageUrl && imageUrl) {
      deleteImages(imageUrl)
    }
    onClose()
  }

  return (
    <>
      <div className="text-center my-3">
        <h1 className="text-center text-2xl font-black ">Edit Profile</h1>
      </div>
      <div className="flex justify-center">
        {!isUploading ? (
          <Avatar
            src={imageUrl || no_user}
            size={200}
            alt="Profile picture"
            className="mx-auto object-cover my-2 bg-center"
          />
        ) : (
          <Avatar
            icon={<LoadingOutlined />}
            alt="loading"
            size={200}
            className="mx-auto object-cover my-2 bg-center"
          />
        )}
      </div>
      <Form onFinish={onFinish} form={form} initialValues={{ ...userInfo }}>
        <div className="text-center">
          <Form.Item name="imageFile">
            <Upload
              accept="image/jpeg,image/png"
              maxCount={1}
              disabled={isUploading}
              customRequest={handleRequest}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              {' '}
              <Button icon={<UploadOutlined />}>เปลี่ยนรูปโปรไฟล์</Button>
            </Upload>
          </Form.Item>
        </div>
        <Divider className="mx-2">
          <p className="text-gray-400">เกี่ยวกับฉัน</p>
        </Divider>
        <Form.Item name="aboutMe">
          <TextArea
            showCount
            maxLength={300}
            placeholder="เกี่ยวกับฉัน"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Divider>
          <p className="text-gray-400">ลิงก์โซเชียล</p>
        </Divider>
        <Form.Item name={['socialLink', 'instagram']} rules={[{ type: 'url' }]}>
          <Input placeholder="Instagram link" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item name={['socialLink', 'facebook']} rules={[{ type: 'url' }]}>
          <Input placeholder="Facebook link" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item name={['socialLink', 'youtube']} rules={[{ type: 'url' }]}>
          <Input placeholder="Youtube link" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item className="text-right mb-0">
          <Popconfirm
            title={
              <>
                คุณแน่ใช่ใช่ไหม
                <br />
                ว่าจะยกเลิกการแก้ไขทั้งหมด
              </>
            }
            onConfirm={beforeClose}
          >
            <Button className="mr-3">ยกเลิก</Button>
          </Popconfirm>
          <Button type="primary" htmlType="submit" loading={loading} className="px-6">
            ตกลง
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
