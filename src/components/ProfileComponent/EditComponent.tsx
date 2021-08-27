import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input, message } from 'antd'
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { firebaseApp } from '../../config/firebase'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { UploadChangeParam, UploadFile, UploadLocale } from 'antd/lib/upload/interface'
import { useUploadpic } from '../../hooks/useUploadpic'

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

export const EditComponent: React.FC<EditComponentProps> = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo } = userInfoStore()
  const { TextArea } = Input
  const { onClose } = props
  const [imageUrl, setimageUrl] = useState(userInfo.imageUrl)
  const { handleRequest, beforeUpload } = useUploadpic({ setimageUrl, setIsUploading })

  const onFinish = (value: UpdateValue) => {
    onClose()
    console.log(value)
    console.log(imageUrl)
    /* TODO: update profile */
  }

  return (
    <div className="p-3">
      <Divider>
        <h1 className="text-center text-2xl font-black">Edit Profile</h1>
      </Divider>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile picture" className="my-8 mx-auto" width="200" />
      ) : (
        <div className="mx auto my-8 shadow text-center h-52 text-2xl place-content-center">
          No Picture
        </div>
      )}
      <Form onFinish={onFinish} initialValues={userInfo}>
        <div className="text-center">
          <Form.Item
            name="imageUrl"
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
