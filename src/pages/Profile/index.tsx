import { Button, Checkbox, Form, Input, Modal, Select, Space, Tag, Typography, Upload } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { dummySubjects } from '../../constants/dummyData/subject.dummy'
import { PlusOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export const Profile: React.FC = () => {
  const [isViewAllOwn, setIsViewAllOwn] = useState(false)
  const [isViewAllRecent, setIsViewAllRecent] = useState(false)
  const [isOnCreate, setIsOnCreate] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [isOnAddTag, setIsOnAddTag] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile<any>[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ])

  useEffect(() => {
    form.setFieldsValue({ tags: tags })
  }, [tags])

  useEffect(() => {
    if (!isOnCreate) {
      form.resetFields()
      setTags([])
    }
  }, [isOnCreate])

  const handleClose = (deletetag: string) => {
    setIsOnAddTag(false)
    setTags(tags.filter(tag => tag != deletetag))
  }

  const handleInputBlur = () => {
    if (inputValue.length) {
      setTags([...tags, inputValue])
      setInputValue('')
    }
    setIsOnAddTag(false)
  }

  const handleInputAdd = () => {
    if (inputValue.length) {
      setTags([...tags, inputValue])
      setInputValue('')
    }
    if (tags.length >= 4) {
      setIsOnAddTag(false)
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onFinish = () => {
    console.log(form.getFieldsValue())
    setIsOnCreate(false)
  }

  return (
    <>
      <Modal
        width="700px"
        maskClosable={false}
        visible={isOnCreate}
        centered
        onCancel={() => setIsOnCreate(false)}
        destroyOnClose
        closable
        footer={false}
        className="my-5"
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
            <Input onKeyDown={e => (e.keyCode == 13 ? e.preventDefault() : '')} />
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
              onKeyDown={e => (e.keyCode == 13 ? e.preventDefault() : '')}
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
            {tags.map(tag => (
              <Tag key={tag} closable onClose={() => handleClose(tag)}>
                {tag.length > 20 ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            ))}
            {tags.length < 4 &&
              (isOnAddTag ? (
                <Input
                  autoFocus
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onBlur={handleInputBlur}
                  onPressEnter={handleInputAdd}
                  onKeyDown={e => (e.keyCode == 13 ? e.preventDefault() : '')}
                />
              ) : (
                <Tag className="site-tag-plus" onClick={() => setIsOnAddTag(true)}>
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
                {'  '}แนะนำให้เป็นรูป 640px*640px เพื่อให้รูปอยู่ตรงกลาง
              </>
            }
            {...formItemLayout}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              multiple
              onChange={file => setFileList(file.fileList)}
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
      <div className="flex justify-center my-10">
        <div className="w-1/5 h-screen bg-gray-400 mx-2"></div>
        <div className="w-1/2 m-2.5">
          <LectureContainer
            title="My Lecture"
            style={{ minHeight: '500px' }}
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllOwn}
            extra={
              <>
                <a onClick={() => setIsOnCreate(true)}>Add New</a>
                <span className="m-2" />
                <a onClick={() => setIsViewAllOwn(!isViewAllOwn)}>
                  {isViewAllOwn ? 'View Less' : 'View All'}
                </a>
              </>
            }
          ></LectureContainer>
          <div className="m-4"></div>
          <LectureContainer
            title="Recent Lecture"
            style={{ minHeight: '500px' }}
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllRecent}
            extra={
              <a onClick={() => setIsViewAllRecent(!isViewAllRecent)}>
                {isViewAllRecent ? 'View Less' : 'View All'}
              </a>
            }
          ></LectureContainer>
        </div>
      </div>
    </>
  )
}
