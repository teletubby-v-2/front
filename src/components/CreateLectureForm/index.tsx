import React from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Tag,
  Typography,
  Upload,
} from 'antd'
import { LoadingOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { dontSubmitWhenEnter } from '../../utils/eventManage'
import { useLectureForm } from './hooks'
import { lectureStore } from '../../store/lecture.store'
import { UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { formItemLayout, myLocale } from './constants'
import kuSubject from '../../constants/subjects.json'
import { Lecture } from '../../constants/interface/lecture.interface'

export interface CreateLectureFormProps extends ModalProps {
  label?: string
  className?: string
  initData?: UpdateLectureDTO
  onclick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  callback?: (lecture?: Lecture) => void
}

export const CreateLectureForm: React.FC<CreateLectureFormProps> = props => {
  const {
    label = 'Add New',
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
    previewImage,
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
    previewCancel,
  } = useLectureForm(addOwnLecture, initData, callback)
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
        <img alt="example" className="w-full" src={previewImage} />
      </Modal>
      <Modal
        width="700px"
        maskClosable={false}
        visible={isOnCreate}
        centered
        onCancel={() => {
          closeModal()
          callback && callback()
        }}
        destroyOnClose
        closable
        footer={false}
        getContainer={false}
        className="my-5"
        {...rest}
      >
        <Typography.Title level={3} className="text-center mt-3">
          {initData.lectureId ? 'แก้ไขโพสต์สรุป' : 'สร้างโพสต์สรุป'}
        </Typography.Title>
        <Form form={form} name="createLecture" onFinish={onFinish} initialValues={initData}>
          <Form.Item
            label="ชื่อหัวข้อสรุป"
            name="lectureTitle"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input onKeyDown={dontSubmitWhenEnter} />
          </Form.Item>
          <Form.Item label="คำอธิบาย" name="description" {...formItemLayout}>
            <Input.TextArea
              showCount
              allowClear
              maxLength={200}
              autoSize={{ minRows: 3, maxRows: 6 }}
              onKeyDown={dontSubmitWhenEnter}
            />
          </Form.Item>
          <Form.Item
            label="ชื่อวิชา"
            name="subjectId"
            rules={[{ required: true }]}
            getValueFromEvent={value => value.split()[0]}
            {...formItemLayout}
          >
            <Select allowClear showSearch>
              {Object.entries(kuSubject.subjects).map(([key, subject]) => (
                <Select.Option
                  key={key}
                  value={`${key} ${subject.subjectNameTh}${subject.subjectNameEn}`}
                >
                  {key} {subject.subjectNameTh} {subject.subjectNameEn}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Form.Item name="isMid" valuePropName="checked" noStyle>
              <Checkbox>midterm</Checkbox>
            </Form.Item>
            <Form.Item name="isFinal" valuePropName="checked" noStyle>
              <Checkbox>final</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item name="tags" label="แทค" {...formItemLayout} initialValue={initData?.tags}>
            {form.getFieldValue('tags') &&
              form.getFieldValue('tags').map((tag: string, index: number) => (
                <Tag key={index} closable onClose={() => handleClose(tag)}>
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
                <Tag className="site-tag-plus" onClick={OnAddTag}>
                  <PlusOutlined /> New Tag
                </Tag>
              ))}
          </Form.Item>
          <Form.Item
            label="รูปภาพ"
            validateStatus="warning"
            help={
              <>
                <InfoCircleOutlined className="tag-icon" />
                {'  '}แนะนำให้เป็นรูปขนาดเล็กกว่า 2MB
              </>
            }
            {...formItemLayout}
          >
            <Upload
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
                <div className="m-2">อัพโหลด</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item className="w-full text-right">
            <Form.Item noStyle>
              <Button
                onClick={() => {
                  closeModal()
                  callback && callback()
                }}
              >
                ยกเลิก
              </Button>
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
