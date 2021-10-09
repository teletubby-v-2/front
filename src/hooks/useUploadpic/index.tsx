import { message } from 'antd'
import { uploadImage, deleteImages } from '../../service/storage'
import { RcFile } from 'antd/lib/upload/interface'
import { UploadRequestOption } from 'rc-upload/lib/interface'

export interface UploadPicOptions {
  setimageUrl: (imageUrl: string) => void
  setIsUploading: (isUploading: boolean) => void
  imageUrl: string | undefined
  originalimageUrl: string | undefined
}

export const useUploadpic = (props: UploadPicOptions) => {
  const { setimageUrl, setIsUploading, imageUrl, originalimageUrl } = props
  const oldimageUrl = imageUrl

  const uploadNewImage = async (file: RcFile) => {
    try {
      setIsUploading(true)
      const uploadStatus = await uploadImage(file)
      if (uploadStatus.url) {
        setimageUrl(uploadStatus.url)
        if (oldimageUrl != originalimageUrl) {
          oldimageUrl ? deleteImages(oldimageUrl) : null
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
    handleRequest,
    beforeUpload,
  }
}
