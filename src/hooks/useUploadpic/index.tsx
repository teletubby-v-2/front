import { message } from 'antd'
import { uploadImage } from '../../service/storage'

export interface UploadPicProps {
  setimageUrl: (imageUrl: string) => void
  setIsUploading: (isUploading: boolean) => void
}

export const useUploadpic = (props: UploadPicProps) => {
  const { setimageUrl, setIsUploading } = props

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

  return {
    handleRequest,
    beforeUpload,
  }
}
