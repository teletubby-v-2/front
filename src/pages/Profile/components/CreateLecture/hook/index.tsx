import Form from 'antd/lib/form'
import form from 'antd/lib/form'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import { uploadImage } from '../../../../../service/storage'

export const useLectureForm = (
  isOnCreate: boolean,
  setIsOnCreate: (isOnCreate: boolean) => void,
) => {
  const [form] = Form.useForm()
  const [inputValue, setInputValue] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string[]>([])
  const [isOnAddTag, setIsOnAddTag] = useState(false)
  const [checkTagSize, setCheckTagSize] = useState(true)

  useEffect(() => {
    setIsOnAddTag(false)
  }, [])

  useEffect(() => {
    if (!isOnCreate) {
      form.resetFields()
      form.setFieldsValue({ tags: [] })
      setPhotoUrl([])
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

  const onFinish = () => {
    console.log(form.getFieldsValue())
    setIsOnCreate(false)
  }

  const uploadNewImage = async (file: File) => {
    try {
      const downloadUrl = await uploadImage(file)
      setPhotoUrl([...photoUrl, downloadUrl])
      return downloadUrl
    } catch (error: any) {
      console.log(error.code)
      return error.code
    }
  }

  const handleCloseModal = () => {
    setIsOnCreate(false)
  }

  const OnAddTag = () => {
    setIsOnAddTag(true)
  }

  return {
    form,
    inputValue,
    checkTagSize,
    isOnAddTag,
    handleClose,
    handleInputChange,
    handleInputBlur,
    handleInputAdd,
    onFinish,
    uploadNewImage,
    handleCloseModal,
    OnAddTag,
  }
}

export const useFileList = () => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>()
  const handleFilelist = (file: UploadChangeParam<UploadFile<any>>) => {
    setFileList(file.fileList)
  }
  return { fileList, handleFilelist }
}
