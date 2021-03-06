import { message } from 'antd'
import Form from 'antd/lib/form'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import { CreateLectureDTO, UpdateLectureDTO } from '../../../constants/dto/lecture.dto'
import { Lecture } from '../../../constants/interface/lecture.interface'
import { createLecture, updateLecture } from '../../../service/lectures'
import { uploadImage, uploadPdf } from '../../../service/storage'
import { initPhoto, removeUndefined } from '../../../utils/object'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { useUploadpic } from '../../../hooks/useUploadpic'

export const useLectureForm = (
  addOwnLecture: (lecture: Lecture) => void,
  initData?: UpdateLectureDTO,
  callback?: (lecture?: Lecture) => void,
) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isOnCreate, setIsOnCreate] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isOnAddTag, setIsOnAddTag] = useState(false)
  const [checkTagSize, setCheckTagSize] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>(initPhoto(initData?.imageUrl) || [])
  const [isUpdate] = useState(initData?.lectureId ? true : false)
  const [pdf, setPdf] = useState<UploadFile[]>(initPhoto(initData?.pdfUrl) || [])
  const [isUploadingThumbnel, setIsUploadingThumbnel] = useState(false)
  const [imageUrl, setImageUrl] = useState(initData?.imageUrl?.[0])
  const { handleRequest: handleRequestThumbnel, beforeUpload } = useUploadpic({
    setImageUrl,
    setIsUploading: setIsUploadingThumbnel,
    imageUrl,
    originalimageUrl: '',
  })

  useEffect(() => {
    setIsOnAddTag(false)
  }, [])

  useEffect(() => {
    if (!isOnCreate && !(initData?.lectureId && loading)) {
      form.resetFields()
      setImageUrl(initData?.imageUrl?.[0])
      form.setFieldsValue({ tags: initData?.tags || [] })
      form.setFieldsValue({ imageUrl: initData?.imageUrl || [] })
      form.setFieldsValue({ pdfUrl: initData?.pdfUrl || [] })
      form.setFieldsValue({ isPdf: initData?.isPdf || false })
      setFileList(initPhoto(initData?.imageUrl))
      setPdf(initPhoto(initData?.pdfUrl))
    }
    setLoading(false)
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
    } catch (error) {
      console.log(error)
    }
  }

  const uploadNewPdf = async (file: RcFile) => {
    try {
      if (pdf.length !== 0) throw '???????????????????????????????????? 1 ????????????'
      const uploadStatus = await uploadPdf(file)
      if (uploadStatus.url) {
        setPdf(pdf => [...pdf, uploadStatus])
      }
    } catch (error) {
      message.error(error as string)
    }
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

  const handleFilelist = (
    file: UploadChangeParam<UploadFile> | { fileList: UploadFile[]; file?: UploadFile },
  ) => {
    if (file?.file?.status === 'removed') {
      setFileList(file.fileList)
      form.setFieldsValue({ imageUrl: file.fileList.map(file => file.url) })
    }
    if (file?.file?.status === 'uploading') {
      setIsUploading(true)
    } else {
      setFileList(file.fileList)
    }
  }

  const handlePdfList = (file: UploadChangeParam<UploadFile>) => {
    if (file.file.status === 'removed') {
      setPdf(file.fileList)
      form.setFieldsValue({ pdfUrl: file.fileList.map(file => file.url) })
    }
    if (file.file.status === 'uploading') {
      setIsUploading(true)
    }
  }

  const handleRequest = ({ file }: UploadRequestOption) => {
    if (form.getFieldValue('isPdf'))
      uploadNewPdf(file as RcFile).finally(() => setIsUploading(false))
    else uploadNewImage(file as RcFile).finally(() => setIsUploading(false))
  }

  const onFinish = () => {
    setLoading(true)
    const formValue = form.getFieldsValue()

    if (isUploading) {
      return message.warning('????????????????????????????????????????????????')
    }
    if (!formValue.isPdf && fileList.length === 0) {
      return message.warning('??????????????????????????????????????????????????????????????????')
    }
    if (formValue.isPdf) {
      if (pdf.length === 0) return message.warning('??????????????????????????????????????????????????????????????????')
      if (!imageUrl) return message.warning('???????????????????????????????????????')
    }
    const value: Partial<CreateLectureDTO> = removeUndefined({
      ...formValue,
      subjectId: formValue.subjectId.split(' ')[0],
      imageUrl: formValue.isPdf ? [imageUrl] : fileList.map(file => file.url),
      pdfUrl: formValue.isPdf ? pdf.map(file => file.url) : undefined,
    })

    if (!isUpdate) {
      createLecture(value as CreateLectureDTO)
        .then(lecture => {
          message.success('??????????????????????????????????????????')
          addOwnLecture(lecture)
        })
        .catch(err => console.error(err))
    } else {
      const updateValue = { ...value, lectureId: initData?.lectureId }
      updateLecture(updateValue as CreateLectureDTO)
        .then(() => {
          message.success('?????????????????????????????????????????????')

          callback && callback({ ...initData, ...updateValue } as Lecture)
        })
        .catch(err => {
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
    pdf,
    loading,
    isUploadingThumbnel,
    imageUrl,
    setImageUrl,
    handleRequestThumbnel,
    beforeUpload,
    openModal,
    closeModal,
    handleFilelist,
    handleClose,
    handleInputChange,
    handleInputBlur,
    handleRequest,
    handleInputAdd,
    onFinish,
    OnAddTag,
    handlePdfList,
  }
}
