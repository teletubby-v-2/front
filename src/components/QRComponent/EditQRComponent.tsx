import React from 'react'
import { Button, Divider, Form, Input, Popconfirm } from 'antd'
import { userInfoStore } from '../../store/user.store'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { updateUser } from '../../service/user'
import { deleteImages } from '../../service/storage'
import firebase from 'firebase'
export interface UpdateValue {
  donateDescription?: string
  promtpay?: string
}

export interface EditComponentProps {
  onClose: () => void
}

export const EditQRComponent: React.FC<EditComponentProps> = props => {
  // const [isUploading, setIsUploading] = useState(false)
  const { TextArea } = Input
  const { onClose } = props
  const { userInfo, setDonate } = userInfoStore()
  // const [imageUrl, setimageUrl] = useState(userInfo.donateImage)
  // const { handleRequest, beforeUpload } = useUploadpic({
  //   setImageUrl: setimageUrl,
  //   setIsUploading,
  //   imageUrl,
  //   originalimageUrl: '',
  // })

  const onFinish = (value: UpdateValue) => {
    const promtpayUrl = value.promtpay ? `https://promptpay.io/${value.promtpay}` : undefined
    onClose()
    if (
      promtpayUrl != userInfo.donateImage ||
      value.donateDescription != userInfo.donateDescription
    ) {
      const data = {
        donateImage: promtpayUrl || firebase.firestore.FieldValue.delete(),
        donateDescription: value.donateDescription || firebase.firestore.FieldValue.delete(),
      }
      updateUser(data)
        .then(() => {
          setDonate(promtpayUrl || '', value.donateDescription || '')
          if (promtpayUrl != userInfo.donateImage && userInfo.donateImage) {
            deleteImages(userInfo.donateImage)
          }
        })
        .catch(err => console.log(err))
    }
  }

  // const beforeClose = () => {
  //   if (imageUrl != userInfo.donateImage && imageUrl) {
  //     deleteImages(imageUrl)
  //   }
  //   onClose()
  // }

  return (
    <>
      <Divider>
        <div className="text-xl">ช่องทางสนับสนุน</div>
      </Divider>
      <Form
        onFinish={onFinish}
        initialValues={{
          ...userInfo,
          promtpay: userInfo.donateImage?.replace('https://promptpay.io/', ''),
        }}
      >
        <Form.Item name="promtpay" label="หมายเลขพร้อมเพย์">
          <Input />
          {/* <Upload
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
          </Upload> */}
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
          <Popconfirm title="คุณแน่ใช่ไหมว่าจะยกเลิกการแก้ไข" onConfirm={onClose}>
            <Button>ยกเลิก</Button>
          </Popconfirm>
          <Button type="primary" htmlType="submit" className="px-4 ml-3">
            ตกลง
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
