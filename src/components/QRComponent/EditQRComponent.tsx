import React, { useState } from 'react'
import { Button, Divider, Form, Upload, Input, Popconfirm } from 'antd'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useUploadpic } from '../../hooks/useUploadpic'
import { updateUser } from '../../service/user'
import { deleteImages } from '../../service/storage'
import { initPhoto } from '../../utils/object'
import firebase from 'firebase'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
    console.log(value)
    onClose()
    if (imageUrl != userInfo.donateImage || value.donateDescription != userInfo.donateDescription) {
      const data = {
        donateImage: imageUrl || firebase.firestore.FieldValue.delete(),
        donateDescription: value.donateDescription || firebase.firestore.FieldValue.delete(),
      }
      updateUser(data)
        .then(() => {
          setDonate(imageUrl || '', value.donateDescription || '')
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
    <div className="p-6 bg-white">
      <Divider>
        <div className="text-xl">ช่องทางสนับสนุน</div>
      </Divider>
      <Form onFinish={onFinish} initialValues={userInfo}>
        <Form.Item name="qrCodeFile" label="อัพโหลด QR code">
          <Upload
            listType="picture-card"
            accept="image/jpeg,image/png"
            maxCount={1}
            fileList={imageUrl ? initPhoto([imageUrl]) : undefined}
            disabled={isUploading}
            customRequest={handleRequest}
            beforeUpload={beforeUpload}
            onRemove={() => setimageUrl(undefined)}
          >
            {!imageUrl &&
              !isUploading &&
              (imageUrl ? (
                <LazyLoadImage
                  src={imageUrl}
                  alt="QR"
                  className="w-30 h-30 object-center object-cover"
                  effect="opacity"
                />
              ) : (
                <p>อัพโหลด</p>
              ))}
          </Upload>
        </Form.Item>
        <Form.Item name="donateDescription">
          <TextArea
            showCount
            maxLength={200}
            placeholder="เกี่ยวกับการสนับสนุน"
            onKeyDown={dontSubmitWhenEnter}
          />
        </Form.Item>
        <Form.Item className="text-right mb-0">
          <Popconfirm title="คุณแน่ใช่ไหมว่าจะยกเลิกการแก้ไข" onConfirm={beforeClose}>
            <Button>ยกเลิก</Button>
          </Popconfirm>
          <Button type="primary" htmlType="submit" className="px-4 ml-3">
            ตกลง
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
