import React from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Popconfirm,
  Radio,
  Select,
  Tag,
  Typography,
  Upload,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useLectureForm } from './hooks'
import { lectureStore } from '../../store/lecture.store'
import { UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { formItemLayout, myLocale } from './constants'
import { options as selectOptions } from '../../utils/optionsUtil'
import { Lecture } from '../../constants/interface/lecture.interface'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const options = [
  { label: 'picture', value: false },
  { label: 'pdf', value: true },
]

const UploadStyled = styled(Upload)`
  & .ant-upload-list {
    display: flex;
    flex-wrap: wrap;
  }
`

export interface CreateLectureFormProps extends ModalProps {
  label?: string
  className?: string
  initData?: UpdateLectureDTO
  onclick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  callback?: (lecture?: Lecture) => void
}

export const CreateLectureForm: React.FC<CreateLectureFormProps> = props => {
  const {
    label = 'เพิ่มสรุป',
    className,
    initData = {} as UpdateLectureDTO,
    children,
    onclick,
    callback,
    ...rest
  } = props

  const { addOwnLecture } = lectureStore()

  const {
    form,
    isOnCreate,
    inputValue,
    checkTagSize,
    isOnAddTag,
    fileList,
    isUploading,
    previewVisible,
    pdf,
    previewImage,
    loading,
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
    handlePreview,
    handlePdfList,
    previewCancel,
  } = useLectureForm(addOwnLecture, initData, callback)
  const onCancel = () => {
    if (isUploading) {
      return message.warning('รูปภาพกำลังอัพโหลด')
    }
    closeModal()
    callback && callback()
  }

  return (
    <div className={className}>
      <a
        onClick={e => {
          onclick && onclick(e)
          openModal()
        }}
      >
        {children || label}
      </a>
      <Modal visible={previewVisible} footer={null} onCancel={previewCancel} centered zIndex={9999}>
        {form.getFieldValue('isPdf') ? (
          <iframe src={previewImage} width="90%" height={700}></iframe>
        ) : (
          <img alt="example" className="w-full" src={previewImage} />
        )}
      </Modal>
      <Modal
        width="700px"
        maskClosable={false}
        visible={isOnCreate}
        onCancel={onCancel}
        destroyOnClose
        footer={false}
        confirmLoading={loading}
        getContainer={false}
        className="my-5 top-10"
        {...rest}
      >
        <Typography.Title level={3} className="text-center mt-3">
          {initData.lectureId ? 'แก้ไขโพสต์สรุป' : 'สร้างโพสต์สรุป'}
        </Typography.Title>
        <Form
          form={form}
          name="createLecture"
          onFinish={onFinish}
          initialValues={initData}
          {...formItemLayout}
        >
          <Form.Item label="ชื่อหัวข้อสรุป" name="lectureTitle" rules={[{ required: true }]}>
            <Input onKeyDown={dontSubmitWhenEnter} />
          </Form.Item>
          <Form.Item label="คำอธิบาย" name="description">
            <Input.TextArea
              showCount
              allowClear
              maxLength={300}
              autoSize={{ minRows: 3, maxRows: 6 }}
              onKeyDown={dontSubmitWhenEnter}
            />
          </Form.Item>
          <Form.Item label="ชื่อวิชา" name="subjectId" rules={[{ required: true }]}>
            <Select
              allowClear
              showSearch
              dropdownClassName="fixed"
              optionLabelProp="key"
              autoClearSearchValue={false}
              options={selectOptions}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Form.Item name="isMid" valuePropName="checked" noStyle>
              <Checkbox>midterm</Checkbox>
            </Form.Item>
            <Form.Item name="isFinal" valuePropName="checked" noStyle>
              <Checkbox>final</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item label="แทค" name="tags" initialValue={initData?.tags}>
            {form.getFieldValue('tags') &&
              form.getFieldValue('tags').map((tag: string, index: number) => (
                <Tag key={index} closable onClose={() => handleClose(tag)} color="green">
                  {tag.length > 20 ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              ))}
            {checkTagSize &&
              (isOnAddTag ? (
                <Input
                  autoFocus
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onPressEnter={handleInputAdd}
                  onKeyDown={dontSubmitWhenEnter}
                />
              ) : (
                <Tag onClick={OnAddTag} color="#5CDB95">
                  <PlusOutlined /> New Tag
                </Tag>
              ))}
          </Form.Item>
          <Form.Item name="isPdf" label="รูปแบบของไฟล์" initialValue={initData.isPdf || false}>
            <Radio.Group options={options} disabled={initData.isPdf !== undefined} />
          </Form.Item>

          <Form.Item
            shouldUpdate
            label="อัพโหลดไฟล์"
            valuePropName="fileList"
            validateStatus="warning"
          >
            {() =>
              form.getFieldValue('isPdf') ? (
                <Upload
                  name="logo"
                  accept="application/pdf"
                  listType="picture"
                  maxCount={1}
                  fileList={pdf}
                  locale={myLocale}
                  onChange={handlePdfList}
                  disabled={isUploading}
                  customRequest={handleRequest}
                >
                  <Button icon={isUploading ? <LoadingOutlined /> : <UploadOutlined />}>
                    อัพโหลด PDF
                  </Button>
                </Upload>
              ) : (
                <UploadStyled
                  listType="picture-card"
                  accept="image/*"
                  fileList={fileList}
                  multiple
                  locale={myLocale}
                  onChange={handleFilelist}
                  disabled={isUploading}
                  customRequest={handleRequest}
                  onPreview={handlePreview}
                >
                  <div>
                    {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="m-2">อัพโหลดรูป</div>
                  </div>
                </UploadStyled>
              )
            }
          </Form.Item>
          <Form.Item className="w-full text-right mb-0" wrapperCol={{ span: 24 }}>
            <Form.Item noStyle>
              <Popconfirm
                zIndex={9999}
                onConfirm={onCancel}
                title={
                  <div className="mr-2">
                    คุณแน่ใจใช่ไหมที่จะยกเลิก <br />
                    การ{initData.lectureId ? 'แก้ไขโพสต์สรุป' : 'สร้างโพสต์สรุป'}
                  </div>
                }
              >
                <Button>ยกเลิก</Button>
              </Popconfirm>
            </Form.Item>
            <span className="ml-3" />
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                ตกลง
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
