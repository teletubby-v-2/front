import React from 'react'
import {
  Button,
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
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { dontSubmitWhenEnter } from '../../../../utils/eventManage'
import { dummySubjects } from '../../../../constants/dummyData/subject.dummy'
import { useFileList, useLectureForm } from './hook'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export interface CreateLectureProps extends ModalProps {
  isOnCreate: boolean
  setIsOnCreate: (isOnCreate: boolean) => void
}

export const CreateLecture: React.FC<CreateLectureProps> = props => {
  const { isOnCreate, setIsOnCreate, ...rest } = props

  const {
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
  } = useLectureForm(isOnCreate, setIsOnCreate)

  const { fileList, handleFilelist } = useFileList()

  const normFile = (event: any) => {
    console.log(event)
    if (Array.isArray(event)) {
      return event
    }
    return event && event.fileList
  }

  return (
    <Modal
      width="700px"
      maskClosable={false}
      visible={isOnCreate}
      centered
      onCancel={handleCloseModal}
      destroyOnClose
      closable
      footer={false}
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
        <Form.Item
          label="คำอธิบาย"
          name="description"
          rules={[{ required: true }]}
          {...formItemLayout}
        >
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
            form.getFieldValue('tags').map((tag: string) => (
              <Tag key={tag} closable onClose={() => handleClose(tag)}>
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
          name="upload"
          label="อัพโหลด"
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
            action={uploadNewImage}
            listType="picture-card"
            accept="image/*"
            fileList={fileList}
            multiple
            onChange={handleFilelist}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 18 }} className="mb-0">
          <Space className="pl-5">
            <Form.Item noStyle>
              <Button onClick={() => setIsOnCreate(false)}>ยกเลิก</Button>
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
  )
}
