import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input, message } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../../store/user.store'
import { firebaseApp } from '../../../../config/firebase'
import { dontSubmitWhenEnter } from '../../../../utils/eventManage'
import { uploadImage } from '../../../../service/storage'

export interface UpdateValue {
  aboutme: string
  QRUrl: string
}

export interface EditComponentProps {
  onClose: () => void
}

/* TODO: upload QR picture function*/

export const EditQRComponent: React.FC<EditComponentProps> = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { userInfo } = userInfoStore()
  const { TextArea } = Input
  const { onClose } = props
  const [QRUrl, setQRUrl] = useState(String)

  const uploadNewImage = async (file: File) => {
    try {
      setIsUploading(true)
      const uploadStatus = await uploadImage(file)
      if (uploadStatus.url) {
        setQRUrl(uploadStatus.url)
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
    /* TODO: update QR */
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
    <div className="p-3">
      <Divider>
        <p className="text-xl">Donate Preview</p>
      </Divider>
      <Form onFinish={onFinish}>
        <Form.Item
          name="QRUrl"
          label="Upload QRcode: "
          help={
            <>
              <InfoCircleOutlined className="tag-icon" />
              {'  '}แนะนำให้เป็นรูปขนาดเล็กกว่า 2MB
            </>
          }
        >
          <Upload
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            disabled={isUploading}
            customRequest={handleRequest}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            {QRUrl ? <img src={QRUrl} alt="QR" /> : <p>Upload</p>}
          </Upload>
        </Form.Item>
        <Form.Item name="aboutdonate">
          <TextArea
            showCount
            maxLength={300}
            placeholder="about donate"
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
