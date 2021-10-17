import { message } from 'antd'
import { uploadImage, deleteImages } from '../../service/storage'
import { RcFile } from 'antd/lib/upload/interface'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { useState } from 'react'
import { initPhoto } from '../../utils/object'

export interface UploadPicOptions {}

export const useUploadPic = (
  setIsUploading: (isUploading: boolean) => void,
  originalimageUrl?: string,
) => {
  const [image, setImage] = useState(originalimageUrl ? initPhoto([originalimageUrl]) : undefined)

  const uploadNewImage = async (file: RcFile) => {
    try {
      setIsUploading(true)
      const uploadStatus = await uploadImage(file)
      if (uploadStatus.url) {
        setImage([uploadStatus])
        if (image != originalimageUrl) {
          image ? deleteImages(image[0].url || '') : null
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRequest = (option: UploadRequestOption) => {
    uploadNewImage(option.file as RcFile).finally(() => setIsUploading(false))
  }

  function beforeUpload(file: RcFile) {
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

  return {
    image,
    setImage,
    handleRequest,
    beforeUpload,
  }
}
