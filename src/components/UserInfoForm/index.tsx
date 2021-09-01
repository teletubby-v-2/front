import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Upload, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { createUser } from '../../service/user'
import { SocialLink } from '../../constants/interface/myUser.interface'
import { Json, removeUndefined } from '../../utils/object'
import { useHistory } from 'react-router-dom'

export interface UpdateValue {
  email: string
  userName: string
  aboutMe: string
  instagram: string
  facebook: string
  youtube: string
  imageUrl: string
}

export const UserInfoForm: React.FC = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo } = userInfoStore()
  const { TextArea } = Input
  const [imageUrl, setimageUrl] = useState(userInfo.imageUrl)
  const { handleRequest, beforeUpload } = useUploadpic({ setimageUrl, setIsUploading })
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    form.setFieldsValue({ userName: userInfo.userName, email: userInfo.email })
  }, [userInfo])

  const onFinish = (value: UpdateValue) => {
    console.log(value)
    console.log(imageUrl)
    const { youtube, facebook, instagram, imageUrl: url, ...rest } = value
    const socialLink: SocialLink[] = []
    if (instagram) {
      socialLink.push({
        socialMediaName: 'instagram',
        socialMedisUrl: instagram,
      })
    }
    if (facebook) {
      socialLink.push({
        socialMediaName: 'Facebook',
        socialMedisUrl: facebook,
      })
    }
    if (youtube) {
      socialLink.push({
        socialMediaName: 'youtube',
        socialMedisUrl: youtube,
      })
    }
    createUser({
      ...removeUndefined(rest as unknown as Json),
      imageUrl,
      socialLink,
    }).then(() => history.push('addSubject'))
    /* TODO: update profile */
  }

  return (
    <div className="px-5 border bg-white shadow-1 rounded-md pt-5" style={{ width: 700 }}>
      <h1 className="text-center text-3xl font-black pb-3">โปรไฟล์ของฉัน</h1>
      <div className="w-full flex justify-center mb-5">
        <Avatar size={200} icon={<UserOutlined />} src={imageUrl} className="" />
      </div>
      <Form onFinish={onFinish} form={form}>
        <div className="text-center">
          <Form.Item name="imageUrl">
            <Upload
              accept="image/*"
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
        <Divider />
        <div className="flex space-x-2">
          <Form.Item className="flex-1" name="userName">
            <Input addonBefore="ชื่อที่แสดง" />
          </Form.Item>
          <Form.Item className="flex-1" name="email">
            <Input value={userInfo.email} disabled={true} addonBefore="อีเมลล์" />
          </Form.Item>
        </div>
        <Form.Item name="aboutMe">
          <TextArea
            showCount
            maxLength={300}
            placeholder="เกี่ยวกับฉัน"
            onKeyDown={dontSubmitWhenEnter}
            rows={5}
          />
        </Form.Item>
        <Divider>
          <p className="text-gray-400 text-sm">ลิงค์โซเชียล</p>
        </Divider>
        <Form.Item name="instagram">
          <Input addonBefore="https://" placeholder="Instagram" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item name="facebook">
          <Input addonBefore="https://" placeholder="Facebook" onKeyDown={dontSubmitWhenEnter} />
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
        <Form.Item className=" text-right">
          <Button type="primary" htmlType="submit" className="px-5">
            ถัดไป
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
