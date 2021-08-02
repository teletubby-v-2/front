import React from 'react'
import {
  Button,
  ButtonProps,
  Checkbox,
  Form,
  Input,
  Modal,
  ModalProps,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
} from 'antd'
import { LoadingOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { dontSubmitWhenEnter } from '../../../../utils/eventManage'
import { dummySubjects } from '../../../../constants/dummyData/subject.dummy'
import { useLectureForm } from './hook'
import { UploadLocale } from 'antd/lib/upload/interface'
import { getFilePath } from '../../../../service/storage'
import { lectureStore } from '../../../../store/lecture.store'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const myLocale: UploadLocale = {
  uploading: 'Uploading...',
  uploadError: 'อัพโหลดไฟล์ไม่สำเร็จ',
}

export interface CreateLectureProps extends ModalProps {
  label?: string
  className?: string
}

export const CreateLecture: React.FC<CreateLectureProps> = props => {
  const { label = 'Add New', className, ...rest } = props

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
  } = useLectureForm(addOwnLecture)
  return (
    <div className={className}>
      <a onClick={openModal}>{label}</a>
      <Modal visible={previewVisible} footer={null} onCancel={previewCancel}>
        <img alt="example" className="w-full" src={previewImage} />
      </Modal>
      <Modal
        width="700px"
        maskClosable={false}
        visible={isOnCreate}
        centered
        onCancel={closeModal}
        destroyOnClose
        closable
        footer={false}
        getContainer={false}
        className="my-5"
        {...rest}
      >
        <Typography.Title level={3} className="text-center mt-3">
          สร้างโพสต์สรุป
        </Typography.Title>
        <Form form={form} name="createLecture" onFinish={onFinish}>
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
            {...formItemLayout}
          >
            <Select allowClear showSearch>
              {dummySubjects.map(subject => (
                <Select.Option key={subject.id} value={`${subject.id}${subject.name}`}>
                  {subject.name}
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
          <Form.Item name="tags" label="แทค" {...formItemLayout}>
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
          <Form.Item wrapperCol={{ offset: 18 }} className="mb-0">
            <Space className="pl-5">
              <Form.Item noStyle>
                <Button onClick={closeModal}>ยกเลิก</Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                  ตกลง
                </Button>
              </Form.Item>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
