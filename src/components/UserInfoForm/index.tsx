import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Upload, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { createUser } from '../../service/user'
import { removeUndefined } from '../../utils/object'
import { useHistory } from 'react-router-dom'
import { CreateUserDTO } from '../../constants/dto/myUser.dto'
import { SocialLink } from '../../constants/interface/myUser.interface'

export interface UpdateValue {
  userName: string
  aboutMe: string
  socialLink: SocialLink
}

export const UserInfoForm: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo, setAll } = userInfoStore()
  const { TextArea } = Input
  const [imageUrl, setimageUrl] = useState(userInfo.imageUrl)
  const { handleRequest, beforeUpload } = useUploadpic({
    setImageUrl: setimageUrl,
    setIsUploading,
    imageUrl,
    originalimageUrl: '',
  })
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    setimageUrl(userInfo.imageUrl)
    form.setFieldsValue({ userName: userInfo.userName, email: userInfo.email })
  }, [userInfo])

  const onFinish = (value: UpdateValue) => {
    const { socialLink, ...rest } = value
    const data: CreateUserDTO = {
      ...rest,
      imageUrl: imageUrl,
      socialLink: removeUndefined(socialLink),
    }
    createUser(data).then(user => {
      setAll(user)
      history.push('subject')
    })
  }

  return (
    <div className="px-5 border bg-white shadow-1 rounded-md pt-5" style={{ width: 700 }}>
      <h1 className="text-center text-3xl font-medium pb-3">สร้างโปรไฟล์</h1>
      <div className="w-full flex justify-center mb-5">
        <Avatar size={200} icon={<UserOutlined />} src={imageUrl} />
      </div>
      <Form onFinish={onFinish} form={form}>
        <div className="text-center">
          <Form.Item>
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
        <Divider />
        <Form.Item>
          <div className="flex space-x-2">
            <Form.Item className="flex-1" name="userName" noStyle>
              <Input addonBefore="ชื่อที่แสดง" />
            </Form.Item>
            <Form.Item className="flex-1" name="email" noStyle>
              <Input value={userInfo.email} disabled={true} addonBefore="อีเมลล์" />
            </Form.Item>
          </div>
        </Form.Item>
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
          <p className="text-gray-400 text-sm">ลิงก์โซเชียล</p>
        </Divider>
        <Form.Item name={['socialLink', 'instagram']} rules={[{ type: 'url' }]}>
          <Input placeholder="Instagram link" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item name={['socialLink', 'facebook']} rules={[{ type: 'url' }]}>
          <Input placeholder="Facebook link" onKeyDown={dontSubmitWhenEnter} />
        </Form.Item>
        <Form.Item name={['socialLink', 'youtube']} rules={[{ type: 'url' }]}>
          <div className="content-center">
            <Input defaultValue="" placeholder="Youtube link" onKeyDown={dontSubmitWhenEnter} />
          </div>
        </Form.Item>
        <Form.Item className=" text-right" shouldUpdate>
          <Button type="primary" htmlType="submit" className="px-5">
            ถัดไป
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
