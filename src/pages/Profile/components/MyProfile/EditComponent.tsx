import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input, message } from 'antd'
import { RightOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'
import { firebaseApp } from '../../../../config/firebase'
import { dontSubmitWhenEnter } from '../../../../utils/eventManage'
import { UploadChangeParam, UploadFile, UploadLocale } from 'antd/lib/upload/interface'
import { uploadImage } from '../../../../service/storage'

export interface UpdateValue {
  aboutme: string
  instagram: string
  twitter: string
  youtube: string
  imageUrl: string
}

export interface EditComponentProps {
  onClose: () => void
}

{
  /* TODO: upload Profile picture function*/
}

export const EditComponent: React.FC<EditComponentProps> = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo } = userInfoStore()
  const { TextArea } = Input
  const { onClose } = props
  const [imageUrl, setimageUrl] = useState(userInfo.imageUrl)

  const uploadNewImage = async (file: File) => {
    try {
      setIsUploading(true)
      const uploadStatus = await uploadImage(file)
      if (uploadStatus.url) {
        setimageUrl(uploadStatus.url)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleRequest = (option: any) => {
    uploadNewImage(option.file).finally(() => setIsUploading(false))
  }

  const onFinish = (value: UpdateValue) => {
    onClose()
    console.log(value)
    /* TODO: update profile */
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <div className="mx-10 my-10">
      <h1 className="text-center text-2xl font-black">Edit Profile</h1>
      {/* <img src={userInfo.imageUrl} className="my-8 mx-auto" width="200" /> */}
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" className="my-8 mx-auto" width="200" />
      ) : (
        <img src={userInfo.imageUrl} className="my-8 mx-auto" width="200" />
      )}
      <Form onFinish={onFinish} initialValues={userInfo}>
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
              {/* TODO: upload Profile picture */}{' '}
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
          <Input
            addonBefore="https://"
            defaultValue=""
            placeholder="Youtube"
            onKeyDown={dontSubmitWhenEnter}
          />
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
