import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input } from 'antd'
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { UpdateUserDTO } from '../../constants/dto/myUser.dto'
import { updateUser } from '../../service/user'
import { deleteImages } from '../../service/storage'

export interface UpdateValue {
  donateDescription: string
  qrCodeFile: string
}

export interface EditComponentProps {
  onClose: () => void
}

export const EditQRComponent: React.FC<EditComponentProps> = props => {
  const [isUploading, setIsUploading] = useState(false)
  const { TextArea } = Input
  const { onClose } = props
  const { userInfo, setDonate } = userInfoStore()
  const [imageUrl, setimageUrl] = useState(userInfo.donateImage)
  const { handleRequest, beforeUpload } = useUploadpic({
    setimageUrl,
    setIsUploading,
    imageUrl,
    originalimageUrl: '',
  })

  const onFinish = (value: UpdateValue) => {
    onClose()
    if (imageUrl != userInfo.donateImage || value.donateDescription != userInfo.donateDescription) {
      const data: UpdateUserDTO = {
        donateImage: imageUrl,
        donateDescription: value.donateDescription ? value.donateDescription : '',
      }
      updateUser(data)
        .then(() => {
          imageUrl && setDonate(imageUrl, value.donateDescription)
          if (imageUrl != userInfo.donateImage && userInfo.donateImage) {
            deleteImages(userInfo.donateImage)
          }
        })
        .catch(err => console.log(err))
    }
  }

  const beforeClose = () => {
    if (imageUrl != userInfo.donateImage && imageUrl) {
      deleteImages(imageUrl)
    }
    onClose()
  }

  return (
    <div className="p-3">
      <Divider>
        <div className="text-xl">ช่องทางสนับสนุน</div>
      </Divider>
      <Form onFinish={onFinish} initialValues={userInfo}>
        <Form.Item
          name="qrCodeFile"
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
            {!isUploading ? (
              imageUrl ? (
                <img src={imageUrl} alt="QR" />
              ) : (
                <p>อัพโหลด</p>
              )
            ) : (
              <div className="text-center my-10">
                <LoadingOutlined />
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="donateDescription">
          <TextArea
            showCount
            maxLength={300}
            placeholder="เกี่ยวกับการสนับสนุน"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Form.Item className="m-3 text-center">
          <Button type="primary" htmlType="submit" size="large" className="mx-4">
            Save
          </Button>
          <Button type="primary" size="large" onClick={beforeClose} className="mx-4">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
