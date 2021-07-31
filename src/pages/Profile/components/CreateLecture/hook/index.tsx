import Form from 'antd/lib/form'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import { deleteImages, uploadImage } from '../../../../../service/storage'

export const useLectureForm = (
  isOnCreate: boolean,
  setIsOnCreate: (isOnCreate: boolean) => void,
) => {
  const [form] = Form.useForm()
  const [inputValue, setInputValue] = useState('')
  const [isOnAddTag, setIsOnAddTag] = useState(false)
  const [checkTagSize, setCheckTagSize] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile<any>[]>([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>()

  useEffect(() => {
    setIsOnAddTag(false)
  }, [])

  useEffect(() => {
    if (!isOnCreate) {
      form.resetFields()
      form.setFieldsValue({ tags: [] })
      form.setFieldsValue({ imageUrl: [] })
      setFileList([])
    }
  }, [isOnCreate])

  const handleClose = (deletetag: string) => {
    setIsOnAddTag(false)
    const oldTags = form.getFieldValue('tags') as string[]
    form.setFieldsValue({ tags: oldTags.filter(tag => tag != deletetag) })
    setCheckTagSize(true)
  }

  const handleInputBlur = () => {
    if (inputValue.length) {
      const oldTags = form.getFieldValue('tags')
      form.setFieldsValue({ tags: oldTags ? [...oldTags, inputValue] : [inputValue] })
      setInputValue('')
    }
    if (form.getFieldValue('tags').length >= 4) {
      setCheckTagSize(false)
    }
    setIsOnAddTag(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputAdd = () => {
    if (inputValue.length) {
      const oldTags = form.getFieldValue('tags')
      form.setFieldsValue({ tags: oldTags ? [...oldTags, inputValue] : [inputValue] })
      setInputValue('')
    }
    if (form.getFieldValue('tags').length >= 4) {
      setCheckTagSize(false)
      setIsOnAddTag(false)
    }
  }

  const uploadNewImage = async (file: File) => {
    try {
      const uploadStatus = await uploadImage(file)
      if (uploadStatus.url) {
        setFileList([...fileList, uploadStatus])
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handlePreview = (file: UploadFile<any>) => {
    setPreviewVisible(true)
    setPreviewImage(file.url as string)
  }

  const previewCancel = () => {
    setPreviewVisible(false)
    setPreviewImage(undefined)
  }

  const handleCloseModal = () => {
    setIsOnCreate(false)
  }

  const OnAddTag = () => {
    setIsOnAddTag(true)
  }

  const handleFilelist = (file: UploadChangeParam<UploadFile<any>>) => {
    if (file.file.status === 'removed') {
      setFileList(file.fileList)
      form.setFieldsValue({ imageUrl: file.fileList.map(file => file.url) })
      deleteImages(file.file.url as string)
    }
    if (file.file.status === 'uploading') {
      setIsUploading(true)
    }
  }

  const handleRequest = (option: any) => {
    uploadNewImage(option.file).finally(() => setIsUploading(false))
  }

  const onFinish = () => {
    console.log(form.getFieldsValue(), fileList)
    setIsOnCreate(false)
  }

  return {
    form,
    inputValue,
    checkTagSize,
    isOnAddTag,
    fileList,
    isUploading,
    previewVisible,
    previewImage,
    handleClose,
    handleInputChange,
    handleInputBlur,
    handleRequest,
    handleInputAdd,
    onFinish,
    handleCloseModal,
    handleFilelist,
    OnAddTag,
    handlePreview,
    previewCancel,
  }
}
