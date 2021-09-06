/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd'
import Form from 'antd/lib/form'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import firebase from 'firebase'
import { useEffect, useState } from 'react'
import { CreateLectureDTO, UpdateLectureDTO } from '../../../constants/dto/lecture.dto'
import { Lecture } from '../../../constants/interface/lecture.interface'
import { createLecture, updateLecture } from '../../../service/lectures'
import { deleteImages, uploadImage } from '../../../service/storage'
import { initPhoto, removeUndefined } from '../../../utils/object'

export const useLectureForm = (
  addOwnLecture: (lecture: Lecture) => void,
  initData?: UpdateLectureDTO,
  callback?: (lecture?: Lecture) => void,
) => {
  const [form] = Form.useForm()
  const [isOnCreate, setIsOnCreate] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isOnAddTag, setIsOnAddTag] = useState(false)
  const [checkTagSize, setCheckTagSize] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>(initPhoto(initData?.imageUrl) || [])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>()
  const [isUpdate] = useState(initData?.lectureId ? true : false)

  useEffect(() => {
    setIsOnAddTag(false)
  }, [])

  useEffect(() => {
    if (!isOnCreate) {
      form.resetFields()
      form.setFieldsValue({ tags: initData?.tags || [] })
      form.setFieldsValue({ imageUrl: initData?.imageUrl || [] })
      setFileList(initPhoto(initData?.imageUrl))
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
        setFileList(fileList => [...fileList, uploadStatus])
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

  const openModal = () => {
    setIsOnCreate(true)
  }

  const closeModal = () => {
    setIsOnCreate(false)
  }

  const OnAddTag = () => {
    setIsOnAddTag(true)
  }

  const handleFilelist = (file: UploadChangeParam<UploadFile>) => {
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
    const value: Partial<CreateLectureDTO> = removeUndefined({
      ...form.getFieldsValue(),
      subjectId: form.getFieldValue('subjectId').split(' ')[0],
      imageUrl: fileList.map(file => file.url),
    })
    const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
    //Todo: Add เข้า DB
    addOwnLecture({
      ...value,
      userId: firebase.auth().currentUser?.uid,
      createAt: timeStamp,
      updateAt: timeStamp,
      viewCount: 0,
      sumRating: 0,
      reviewCount: 0,
    } as Lecture)
    if (!isUpdate) {
      message.info('กำลังสร้าง...')
      createLecture(value as CreateLectureDTO)
        .then(() => message.success('สร้างโพสได้แล้วจ้าา'))
        .catch((err: any) => console.error(err))
    } else {
      message.info('กำลังอัพ...')
      const updateValue = { ...value, lectureId: initData?.lectureId }
      updateLecture(updateValue as CreateLectureDTO)
        .then(() => {
          message.success('อัพเดตโพสสำเร็จ')

          callback && callback({ ...initData, ...updateValue } as Lecture)
        })
        .catch((err: any) => {
          console.error(err)
          callback && callback()
        })
    }
    setIsOnCreate(false)
  }

  return {
    form,
    isOnCreate,
    inputValue,
    checkTagSize,
    isOnAddTag,
    fileList,
    isUploading,
    previewVisible,
    previewImage,
    openModal,
    handleClose,
    handleInputChange,
    handleInputBlur,
    handleRequest,
    handleInputAdd,
    onFinish,
    closeModal,
    handleFilelist,
    OnAddTag,
    handlePreview,
    previewCancel,
  }
}
