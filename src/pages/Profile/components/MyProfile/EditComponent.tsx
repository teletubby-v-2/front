import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input } from 'antd'
import { RightOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'
import { firebaseApp } from '../../../../config/firebase'
import { dontSubmitWhenEnter } from '../../../../utils/eventManage'
import { UploadChangeParam, UploadFile, UploadLocale } from 'antd/lib/upload/interface'

export interface UpdateValue {
  aboutme: string
  instagram: string
  twitter: string
  youtube: string
}

export interface EditComponentProps {
  onClose: () => void
}

{
  /* TODO: upload Profile picture function*/
}
// const handleFilelist = (file: UploadChangeParam<UploadFile<any>>) => {

// }

// const handleRequest = () =>{

// }

export const EditComponent: React.FC<EditComponentProps> = props => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([])
  const [isUploading, setUploading] = useState(false)
  const { userInfo } = userInfoStore()
  const { TextArea } = Input
  const { onClose } = props

  const onFinish = (value: UpdateValue) => {
    onClose()
    console.log(value)
    /* TODO: update profile */
  }

  const myLocale: UploadLocale = {
    uploading: 'Uploading...',
    uploadError: 'อัพโหลดไฟล์ไม่สำเร็จ',
  }

  return (
    <div className="p-3">
      <h1 className="text-center text-2xl font-black">Edit Profile</h1>
      <img src={userInfo.imageUrl} className="my-8 mx-auto object-cover" />
      <Form onFinish={onFinish} initialValues={userInfo}>
        <div className="text-center">
          <Form.Item>
            <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              maxCount={1}
              locale={myLocale}
              // onChange={handleFilelist}
              disabled={isUploading}
              // customRequest={handleRequest}
            >
              {' '}
              {/* TODO: upload Profile picture */}
              <Button className="w-48">
                <UploadOutlined />
                change Image
              </Button>
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
